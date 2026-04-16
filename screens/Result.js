import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
// Colors
import {
  black,
  grey,
  white,
  muted,
  darkLight,
  brightBlue,
  lightBlue,
} from "../styles";
import Header from "../components/Header";
import CalorieCircle from "../components/CalorieCircle";
import { saveResult, getResult } from "../services/firebase";

export default function Result({ route }) {
  const info = route?.params?.info;
  const [result, setResult] = useState({
    tdee: 0,
    goalCalories: 0,
  });

  const calculateTDEE = (info) => {
    const { age, gender, height, weight, activityLevel, goal } = info;

    if (!age || !gender || !height || !weight || !activityLevel || !goal) {
      return null;
    }

    let bmr;

    if (gender === "Male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityMap = {
      sedentary: 1.2,
      lightly: 1.375,
      moderately: 1.55,
      actively: 1.725,
      extra: 1.9,
    };

    const goalMap = {
      lose: -500,
      maintain: 0,
      gain: 500,
    };

    const tdee = bmr * activityMap[activityLevel];

    return Math.round(tdee);
  };

  const applyGoal = (tdee, goal) => {
    const goalMap = {
      lose: -500,
      maintain: 0,
      gain: 500,
    };

    return Math.round(tdee + goalMap[goal]);
  };

  useEffect(() => {
    const loadResult = async () => {
      if (!info) return;

      const dbResult = await getResult();

      let finalResult;

      if (dbResult && dbResult.tdee && dbResult.goalCalories) {
        finalResult = dbResult;
      } else {
        const tdee = calculateTDEE(info);
        if (!tdee) return;

        const adjusted = applyGoal(tdee, info.goal);

        finalResult = {
          tdee,
          goalCalories: adjusted,
        };
      }

      setResult(finalResult);
    };

    loadResult();
  }, [info]);

  if (!info) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: black }}>
        <Header title="Result" showBack />
        <Text style={{ color: white, textAlign: "center", marginTop: 50 }}>
          No data available
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: black }}>
      <Header title={"Result"} showBack={true} />
      <View style={styles.resultContainer}>
        <Text style={styles.title}>Your daily calorie needs</Text>
        <View style={styles.circle}>
          <CalorieCircle value={result.tdee} max={result.tdee} />
        </View>
        <Text style={styles.text}>
          To achieve your {info.goal} weight goal, you should eat approximately
        </Text>
        <Text style={styles.goal}>{result.goalCalories} kcal/day</Text>
        <Text style={styles.text}>
          We’ll help you track your calories and reach your goals.
        </Text>
      </View>
      <TouchableOpacity
        onPress={async () => {
          try {
            await saveResult(result);
            console.log("Result", result);
            Alert.alert("Successfully save your result");
          } catch (error) {
            Alert.alert("Failed to save your result", error.message);
          }
        }}
      >
        <View style={styles.btn}>
          <Text style={styles.btnText}>Save and start your journey!</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: white,
    alignSelf: "center",
    fontSize: 20,
    marginTop: 50,
  },
  resultContainer: {
    alignItems: "center",
  },
  circle: {
    display: "flex",
    alignSelf: "center",
    marginTop: 10,
  },
  text: {
    color: white,
    textAlign: "center",
    marginTop: 30,
    fontSize: 18,
    width: "70%",
  },
  goal: {
    color: lightBlue,
    textAlign: "center",
    marginTop: 10,
    fontSize: 28,
    fontWeight: 600,
  },
  btn: {
    width: 200,
    backgroundColor: brightBlue,
    borderRadius: 12,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    margin: 20,

    // marginHorizontal: 20,
    shadowColor: brightBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  btnText: {
    color: white,
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },
});
