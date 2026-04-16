import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import {
  black,
  grey,
  white,
  muted,
  darkLight,
  brightBlue,
  lightBlue,
} from "../styles";

export default function CalorieCircle({
  value,
  max,
  size = 200,
  strokeWidth = 10,
}) {
  const safeValue = Math.min(value, max); // prevent overflow
  const progress = safeValue / max;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={{ width: size, height: size, alignSelf: 'center' }}>
      <Svg width={size} height={size}>
        {/* Background */}
        <Circle
          stroke={muted}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* Progress */}
        <Circle
          stroke={brightBlue}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>

      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.value}>{value.toLocaleString("vi-VN")}</Text>
        <Text style={styles.label}>kcal/day</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  value: {
    color: "white",
    fontSize: 32,
    fontWeight: "600",
  },
  label: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 4,
  },
});
