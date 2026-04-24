import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

// Colors
import {
  black,
  grey,
  white,
  brightBlue,
  muted,
  lightBlue,
  blueGradient,
  primaryBlue,
} from "../styles";
import { getAllDayTotalCalories } from "../services/firebase";
import { useEffect, useState } from "react";

export default function Graph() {
  const [barData, setBarData] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0); // 0=this week, -1=last week,, -2=2 weeks ago...
  const [locatedWeek, setLocatedWeek] = useState([]);
  const getWeekDates = (offset) => {
    const today = new Date();

    // move to correct week
    today.setDate(today.getDate() + offset * 7);

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
    const week = getWeekDates(weekOffset);

    setLocatedWeek(week);

    const todayStr = new Date().toISOString().split("T")[0];

    setBarData(
      week.map((day) => {
        const found = result.find((item) => item.date === day.fullDate);
        return {
          value: found ? found.calories : 0,
          label: day.label,
          frontColor: day.fullDate === todayStr ? primaryBlue : brightBlue,
        };
      }),
    );
  };

  //Format date display
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchBarData();
    }, [weekOffset]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Calories Overview</Text>
      <View style={styles.navRow}>
        <TouchableOpacity onPress={() => setWeekOffset(weekOffset - 1)}>
          <Text style={styles.navText}>← Last Week</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={weekOffset === 0}
          onPress={() => setWeekOffset(weekOffset + 1)}
        >
          <Text
            style={[styles.navText, weekOffset === 0 && styles.navTextDisabled]}
          >
            Next →
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.week}>
        {locatedWeek.length > 0 &&
          `Week ${formatDate(locatedWeek[0].fullDate)} • ${formatDate(locatedWeek[6].fullDate)}`}
      </Text>
      <View style={styles.chartContainer}>
        <BarChart
          minHeight={5}
          showValuesAsTopLabel
          topLabelTextStyle={{ color: "white", fontSize: 8 }}
          data={barData}
          barWidth={20}
          spacing={20}
          roundedTop
          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{ color: muted }}
          xAxisLabelTextStyle={{ color: muted }}
          noOfSections={6}
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

  navTextDisabled: {
    color: grey,
  },

  week: {
    color: white,
    textAlign: "center",
    marginBottom: 10,
  },

  chartContainer: {
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 10,
  },
});
