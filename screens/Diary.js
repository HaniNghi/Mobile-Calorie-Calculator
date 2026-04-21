import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, View , FlatList, TouchableOpacity} from "react-native";
// Colors
import { black, grey, white, brightBlue, lightBlue } from "../styles";
import { useEffect, useState } from "react";
import { getResult } from "../services/firebase";
import CalorieCircle from "../components/CalorieCircle";
import { useNavigation } from "@react-navigation/native";
import AddFood from "./AddFood"
export default function Diary() {
    const navigation= useNavigation()
  const [result, setResult] = useState({
    tdee: null,
    goalCalories: null,
  });
  const [consumption, setConsumption] = useState(0);
  const [foods, setFoods] = useState([]);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      const resultFromDatabase = await getResult();

      if (resultFromDatabase) {
        setResult(resultFromDatabase);
      }
    };
    fetchResult();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.target}>
        <Text style={styles.text}>Your target</Text>
        <Text style={styles.goal}>{result.goalCalories} kcal/day</Text>
      </View>
      <CalorieCircle value={consumption} max={result.goalCalories} />
      <Text style={styles.text}>Your calories today</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Foods</Text>

        <FlatList
          data={foods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.kcal}>{item.kcal} kcal</Text>
            </View>
          )}
        />
        <TouchableOpacity onPress={() =>navigation.navigate("AddFood")} style={styles.addBtn}>
          <Text style={styles.addText}>+ Add Food</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black,
  },
  goal: {
    color: lightBlue,
    alignSelf: "center",
    fontSize: 30,
    fontWeight: 600,
    marginTop: 10,
  },
  text: {
    color: white,
    alignSelf: "center",
    fontSize: 20,
    margin: 10,
  },
  target: {
    alignItems: "center",
    margin: 20,
  },
  section: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 12,
    marginTop: 20,
  },
  sectionTitle: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  itemText: { color: "white" },
  subText: { color: "#aaa", fontSize: 12 },
  kcal: { color: "white" },

  addBtn: {
    marginTop: 10,
    backgroundColor: "#1D4ED8",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  addText: { color: "white" },

});
