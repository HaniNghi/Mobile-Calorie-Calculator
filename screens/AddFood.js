import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import { black, brightBlue, faded, grey, muted, white } from "../styles";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useMemo } from "react";
import FoodCard from "../components/FoodCard";
import {
  getDefaultFoods,
  addFoodToDay,
  getDayFoods,
  deleteFoodFromDay,
  getUserFoods,
  saveCustomFood,
} from "../services/firebase";
import AddFoodModal from "../components/AddFoodModal";
import { Ionicons } from "@expo/vector-icons";
import CustomFood from "../components/CustomFood";

export default function AddFood() {
  const today = new Date().toISOString().split("T")[0]; // "2026-04-18"
  const [defaultFoods, setDefaultFoods] = useState([]);
  const [todayFoods, setTodayFoods] = useState([]);
  const [userFoods, setUserFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");

  // Get Default Foods form Firebase
  const fetchDefaultFoods = async () => {
    const data = await getDefaultFoods();

    if (data) {
      // Convert object -> array
      const foodsArray = Object.values(data);
      setDefaultFoods(foodsArray);
    }
  };

  // Get Today Foods from Firebase
  const fetchTodayFoods = async () => {
    const data = await getDayFoods(today);

    if (data) {
      // Convert object -> array
      const foodsArray = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      setTodayFoods(foodsArray.reverse());
    } else {
      setTodayFoods([]);
    }
  };

  // Get User Foods form Firebase
  const fetchUserFoods = async () => {
    const data = await getUserFoods();

    if (data) {
      setUserFoods(data);
    }
  };

  // Add Food to Today Food
  const handleSaveFood = async (amount) => {
    if (!selectedFood) return;
    const calories = Math.round(selectedFood.kcal * (Number(amount) / 100));

    const foodWithAmountandCalories = {
      ...selectedFood,
      amount,
      calories,
    };

    await addFoodToDay(today, foodWithAmountandCalories);

    setModalVisible(false);
    setSelectedFood(null);

    await fetchTodayFoods(); // refresh list
  };

  // Delete today food
  const handleDelete = async (id) => {
    await deleteFoodFromDay(today, id);

    fetchTodayFoods(); // refresh list
  };

  // Get All Foods = User Food + Default Food
  const allFoods = useMemo(() => {
    return [...userFoods, ...defaultFoods];
  }, [userFoods, defaultFoods]);

  const filteredFoods = useMemo(() => {
    if (!Array.isArray(allFoods)) return [];

    return allFoods.filter((food) =>
      food.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [allFoods, search]);

  // Save Custom Food to User Food
  const handleSaveCustomFood = async (customFood) => {
    try {
      await saveCustomFood(customFood);

      await fetchUserFoods(); // refresh user foods

      alert("Saved successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to save food");
    }
  };

  useEffect(() => {
    fetchDefaultFoods();
    fetchTodayFoods();
    fetchUserFoods();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: black }}
    >
      <Header title={"Add food"} showDone={true} />
      <Text style={styles.listTitle}>Today foods</Text>
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
      <Text style={styles.listTitle}>Default foods</Text>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color={muted} />
        <TextInput
          placeholder="Search food..."
          placeholderTextColor={muted}
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        style={styles.foodList}
        data={filteredFoods}
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
      <Text style={styles.listTitle}>Custom your food</Text>
      <View style={styles.customContainer}>
        <CustomFood onSave={handleSaveCustomFood} />
      </View>
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
    backgroundColor: grey,
    width: "90%",
    borderRadius: 6,
    maxHeight: 200,
  },
  listTitle: {
    color: brightBlue,
    fontSize: 18,
    fontWeight: 600,
    margin: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 10,
  },

  searchInput: {
    color: "white",
    marginLeft: 8,
    flex: 1,
  },
  customContainer: {
    flex: 1,
    width: "90%",
    maxHeight: 100,
  },
});
