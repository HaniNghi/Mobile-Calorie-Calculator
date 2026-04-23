import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import { black, brightBlue, darkGrey, faded, grey, lightBlue, muted, white } from "../styles";
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

export default function AddFood({ route }) {
  const selectedDate = route?.params?.selectedDate;
  const today = selectedDate ?? new Date().toISOString().split("T")[0]; // "2026-04-18"
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
  }, [today]);

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: black }}
    >
      <View>
        <Header title={"Add food"} showDone={true} />
        <View style={styles.dateCard}>
          <Text style={styles.dateText}>{today}</Text>
          <Text style={styles.subDateText}>Your food tracking</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Today Foods</Text>
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
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Default foods</Text>

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
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Custom your food</Text>
          <View style={styles.customContainer}>
            <CustomFood onSave={handleSaveCustomFood} />
          </View>
          <AddFoodModal
            visible={modalVisible}
            food={selectedFood}
            onClose={() => setModalVisible(false)}
            onSave={handleSaveFood}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black,
    paddingHorizontal: 12,
  },

  dateCard: {
    backgroundColor: "#111",
    padding: 14,
    borderRadius: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#1F1F1F",
  },

  dateText: {
    color: white,
    fontSize: 16,
    fontWeight: "700",
  },

  subDateText: {
    color: muted,
    fontSize: 12,
    marginTop: 4,
  },

  card: {
    backgroundColor: darkGrey,
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1F1F1F",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
    maxHeight: 220,
  },

  sectionTitle: {
    color: lightBlue,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },

  foodList: {
    width: "100%",
    maxHeight: 200,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0F0F0F",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1F1F1F",
  },

  searchInput: {
    color: white,
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
  },
});
