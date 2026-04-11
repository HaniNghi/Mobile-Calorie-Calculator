import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


// Colors
import {
  black,
  white,
  muted,
  darkLight,
  brightBlue,
} from "../components/styles";

export default function CalculatorScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: black }}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Enter your details</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    container: {
      backgroundColor: black,
      padding: 24,
      flex: 1,
    },
  },
  pageTitle: {
    color: muted,
    fontSize: 18,
  },
});
