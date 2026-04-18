import { View, Text, Button, StyleSheet, ScrollView , FlatList } from "react-native";
import { black, white } from "../styles";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import FoodCard from "../components/FoodCard";
import { getDefaultFoods } from "../services/firebase";

export default function AddFood() {
  const [defaultFoods, setDefaultFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      const data = await getDefaultFoods();

      if (data) {
        // Convert object -> array
        const foodsArray = Object.values(data);
        setDefaultFoods(foodsArray);
      }
    };

    fetchFoods();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: black }}
    >
      <Header title={"Add food"} showBack={true} />
      <Text style={{ color: white }}>Add food</Text>

      <FlatList
      style={styles.foodList}
  data={defaultFoods}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <FoodCard
      name={item.name}
      kcal={item.kcal}
      unit={item.unit}
      onAdd={() => console.log("Added:", item.name)}
    />
  )}
/>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  foodList: {
    flex: 1,
    backgroundColor: white,
    width: "90%",
    height: 400,
  }
})
