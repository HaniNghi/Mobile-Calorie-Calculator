import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { black, white } from "../styles";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import FoodCard from "../components/FoodCard";
import { getDefaultFoods , addFoodToDay , getDayFoods, deleteFoodFromDay} from "../services/firebase";
import AddFoodModal from "../components/AddFoodModal";

export default function AddFood() {
  const today = new Date().toISOString().split("T")[0]; // "2026-04-18"
  const [defaultFoods, setDefaultFoods] = useState([]);
  const [todayFoods, setTodayFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchDefaultFoods = async () => {
    const data = await getDefaultFoods();

    if (data) {
      // Convert object -> array
      const foodsArray = Object.values(data);
      setDefaultFoods(foodsArray);
    }
  };
  const fetchTodayFoods = async () => {
    const data = await getDayFoods(today);

    if (data) {
       const foodsArray = Object.entries(data).map(([id, value]) => ({
      id,
      ...value
    }));

    setTodayFoods(foodsArray);
    } else {
      setTodayFoods([]);
    }
  };

  const handleSaveFood = async (amount) => {
    if (!selectedFood) return;

    const foodWithAmount = {
      ...selectedFood,
      amount,
    };

    await addFoodToDay(today, foodWithAmount);

    setModalVisible(false);
    setSelectedFood(null);

    await fetchTodayFoods(); // refresh list
  };

  const handleDelete = async (id) => {
    await deleteFoodFromDay(today, id)

    fetchTodayFoods(); // refresh list
  }

  useEffect(() => {
    fetchDefaultFoods();
    fetchTodayFoods();
  }, []);


  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: black }}
    >
      <Header title={"Add food"} showBack={true} />
      <Text style={{ color: white }}>Add food</Text>
      <FlatList
        style={styles.foodList}
        data={todayFoods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FoodCard
            name={item.name}
            kcal={item.kcal}
            unit={item.unit}
            amount={item.amount}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />

      <FlatList
        style={styles.foodList}
        data={defaultFoods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FoodCard
            name={item.name}
            kcal={item.kcal}
            unit={item.unit}
            onAdd={() => {
              setSelectedFood(item);
              setModalVisible(true);
            }}
          />
        )}
      />
      <AddFoodModal
        visible={modalVisible}
        food={selectedFood}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveFood}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  foodList: {
    flex: 1,
    backgroundColor: white,
    width: "90%",
    marginTop: 10,
  },
});
