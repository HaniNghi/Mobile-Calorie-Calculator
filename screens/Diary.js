import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
// Colors
import {
  black,
  grey,
  white,
  brightBlue,
  lightBlue,
  faded,
  muted,
  blueGradient,
} from "../styles";
import { useEffect, useState } from "react";
import { getResult, getDayFoods } from "../services/firebase";
import CalorieCircle from "../components/CalorieCircle";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Diary() {
  const navigation = useNavigation();
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  ); // 2026-04-10

  const [result, setResult] = useState({
    tdee: null,
    goalCalories: null,
  });
  const [consumption, setConsumption] = useState(0);
  const [foods, setFoods] = useState([]);

  const fetchResult = async () => {
    const resultFromDatabase = await getResult();

    if (resultFromDatabase) {
      setResult(resultFromDatabase);
    }
  };

  // Get Today Foods from Firebase and Set to foods
  const fetchTodayFoods = async () => {
    const data = await getDayFoods(selectedDate);

    if (data) {
      // Convert object -> array
      const foodsArray = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      setFoods(foodsArray);
    } else {
      setFoods([]);
    }
  };

  // consumption calculation
  const handleConsumption = () => {
    const total = foods.reduce((sum, item) => sum + Number(item.calories), 0);

    setConsumption(total);
  };

  // Handle day that user choose
  const changeDay = (direction) => {
    const date = new Date(selectedDate);

    date.setDate(date.getDate() + direction);

    setSelectedDate(date.toISOString().split("T")[0]);
  };

  // Focus help refreshing after redirect to Diary
  useFocusEffect(
    useCallback(() => {
      fetchResult();
      fetchTodayFoods();
    }, [selectedDate]),
  );

  useEffect(() => {
    handleConsumption();
  }, [foods]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.manageDayContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => changeDay(-1)}
        >
          <Text style={styles.navButtonText}>← Prev</Text>
        </TouchableOpacity>

        <LinearGradient
          colors={[blueGradient, "#2563EB"]}
          style={styles.gradientPill}
        >
          <Text style={styles.gradientText}>
            {selectedDate === today ? "Today" : selectedDate}
          </Text>
        </LinearGradient>

        <TouchableOpacity style={styles.navButton} onPress={() => changeDay(1)}>
          <Text style={styles.navButtonText}>Next →</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.targetCard}>
        <Text style={styles.text}>Daily Target</Text>
        <Text style={styles.goal}>{result.goalCalories} kcal</Text>
      </View>
      <CalorieCircle
        value={Number(consumption)}
        max={Number(result.goalCalories)}
      />
      <Text style={styles.text}>Your calories today</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Foods</Text>

        <FlatList
          data={foods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.kcal}>{item.calories} kcal</Text>
            </View>
          )}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddFood", { selectedDate: selectedDate })
          }
          style={styles.addBtn}
        >
          <Text style={styles.addText}>Mange</Text>
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
  targetCard: {
    alignItems: "center",
    margin: 15,
    padding: 10,
    borderRadius: 14,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: muted,
    shadowColor: blueGradient,
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 6,
  },
  section: {
    display: "flex",
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 12,
    marginTop: 20,
    maxHeight: 300,
  },
  sectionTitle: {
    color: lightBlue,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#1F1F1F",
  },

  itemText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },

  kcal: {
    color: brightBlue,
    fontWeight: "600",
  },

  addBtn: {
    marginTop: 12,
    backgroundColor: blueGradient,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: blueGradient,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  addText: {
    color: "white",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  manageDayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    marginTop: 10,
  },

  navButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  navButtonText: {
    color: brightBlue,
    fontSize: 13,
    fontWeight: "600",
  },

  gradientPill: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 30,
    shadowColor: blueGradient,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },

  gradientText: {
    color: "white",
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 0.5,
  },
});
