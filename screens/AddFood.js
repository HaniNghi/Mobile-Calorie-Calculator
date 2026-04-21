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
} from "../services/firebase";
import AddFoodModal from "../components/AddFoodModal";
import { Ionicons } from "@expo/vector-icons";
import CustomFood from "../components/CustomFood";


export default function AddFood() {
  const today = new Date().toISOString().split("T")[0]; // "2026-04-18"
  const [defaultFoods, setDefaultFoods] = useState([]);
  const [todayFoods, setTodayFoods] = useState([]);
  const [userFoods, setUserFoods] = useState([]);
  const [allFoods, setAllFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");


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
        ...value,
      }));

      setTodayFoods(foodsArray);
    } else {
      setTodayFoods([]);
    }
  };

  const fetchUserFoods = async () => { 
    const data = await getUserFoods()

    if(data){
      setUserFoods(data)
    }
  }

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
    await deleteFoodFromDay(today, id);

    fetchTodayFoods(); // refresh list
  };

  const filteredFoods = useMemo(() => {
    if (!Array.isArray(allFoods)) return [];

    return allFoods.filter((food) =>
      food.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [defaultFoods, search]);

  const handleSaveCustomFood =  (customFood) => {
    alert("custom food", customFood)
  }

  useEffect(() => {
    fetchDefaultFoods();
    fetchTodayFoods();
    fetchUserFoods();
    setAllFoods([...userFoods, ...defaultFoods])
  }, []);


  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: black }}
    >
      <Header title={"Add food"} showBack={true} />
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
        <Ionicons name="search" size={18} color={muted}/>
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
      <View style={styles.customContainer}>
        <CustomFood 
        onSave={handleSaveCustomFood}
        />
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
    flex: 1,
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
  }
});
