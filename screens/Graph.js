import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { BarChart } from "react-native-gifted-charts";

// Colors
import { black, grey, white, brightBlue, muted, lightBlue, blueGradient } from "../styles";
import { getAllDayTotalCalories } from "../services/firebase";
import { useEffect, useState } from "react";

export default function Graph() {
  const [barData, setBarData] = useState([]);
  const today = new Date();

  const getWeekDates = (offset) => {
    const day = today.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, ...

    // Find the different between today and monday of the week
    const diff = day === 0 ? -6 : 1 - day;

    // Find full date of Monday
    const monday = new Date(today);
    monday.setDate(today.getDate() + diff);

    const week = [];

    for (let i = 0; i < 7; i++) {
      // create each day of the week
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);

      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

      //Adjust the date to match the day of the week.
      week.push({
        fullDate: d.toISOString().split("T")[0],
        label: days[i],
      });
    }

    return week;
  };

  //fecth Date with Calories from Firebase and make it in correct day of the week
  const fetchBarData = async () => {
    const result = await getAllDayTotalCalories();
    console.log("RESULT:", result);

    const week = getWeekDates();

    setBarData(
      week.map((day) => {
        const found = result.find((item) => item.date === day.fullDate);

        const isToday = day.fullDate === today.toISOString().split("T")[0];

        return {
          value: found ? found.calories : 0,
          label: day.label,
          frontColor: isToday ? blueGradient : brightBlue, 
        };
      }),
    );
  };

  useEffect(() => {
    fetchBarData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Calories Overview</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={barData}
          barWidth={20}
          spacing={16}
          roundedTop
          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{ color: muted }}
          xAxisLabelTextStyle={{ color: muted }}
          noOfSections={4}
          isAnimated
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black,
    padding: 16,
  },

  title: {
    color: white,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },

  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  navText: {
    color: brightBlue,
    fontSize: 14,
    fontWeight: "600",
  },

  chartContainer: {
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 16,
  },
});
