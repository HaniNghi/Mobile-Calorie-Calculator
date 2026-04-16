import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, View } from "react-native";
// Colors
import { black, grey, white, brightBlue, lightBlue } from "../styles";
import { useEffect, useState } from "react";
import { getResult } from "../services/firebase";
import CalorieCircle from "../components/CalorieCircle";

export default function Diary() {
  const [result, setResult] = useState({
    tdee: null,
    goalCalories: null,
  });
  const [consumption, setConsumption] = useState(0);
  const [items, setItems] = useState([])

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
      <View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black,
  },
  goal:{
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
});
