import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import { saveInfo } from "../services/firebase";
import Header from '../components/Header'

// Colors
import {
  black,
  grey,
  white,
  muted,
  darkLight,
  brightBlue,
} from "../components/styles";

export default function CalculatorScreen() {
  const [info, setInfo] = useState({
    age: null,
    gender: null,
    height: null,
    weight: null,
    activityLevel: null,
    goal: null,
  });

  const genders = ["Male", "Female"];
  const goals = [
    { label: "Lose weight", value: "lose" },
    { label: "Maintain weight", value: "maintain" },
    { label: "Gain weight", value: "gain" },
  ];
  const activityLevels = [
    { label: "Low (little or no exercise)", value: "low" },
    { label: "Medium (3–5 days/week)", value: "medium" },
    { label: "High (intense daily exercise)", value: "high" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: black }}>
      <Header 
          title={"Enter your details"}
          showBack={true}
        />
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Age</Text>
            <TextInput
              autoCorrect={false}
              style={styles.inputControl}
              placeholder="20"
              placeholderTextColor={white}
              value={info.age}
              onChangeText={(age) => setInfo({ ...info, age })}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Gender</Text>
            <View style={styles.optionRow}>
              {genders.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.optionBtn,
                    info.gender === item && styles.optionBtnActive,
                  ]}
                  onPress={() => setInfo({ ...info, gender: item })}
                >
                  <Text
                    style={[
                      styles.optionText,
                      info.gender === item && styles.optionTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Height</Text>
            <TextInput
              autoCorrect={false}
              style={styles.inputControl}
              placeholder="175"
              placeholderTextColor={white}
              value={info.height}
              onChangeText={(height) => setInfo({ ...info, height })}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Weight</Text>
            <TextInput
              autoCorrect={false}
              style={styles.inputControl}
              placeholder="70"
              placeholderTextColor={white}
              value={info.weight}
              onChangeText={(weight) => setInfo({ ...info, weight })}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Activity Level</Text>
            <Dropdown
              style={styles.dropdown}
              containerStyle={styles.dropdownContainer}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.itemTextStyle}
              activeColor={black}
              data={activityLevels}
              labelField="label"
              valueField="value"
              placeholder="Select activity level"
              value={info.activityLevel}
              onChange={(item) => {
                setInfo({ ...info, activityLevel: item.value });
              }}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Goal</Text>
            <View style={styles.optionRow}>
              {goals.map((item) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.optionBtn,
                    info.goal === item.value && styles.optionBtnActive,
                  ]}
                  onPress={() => setInfo({ ...info, goal: item.value })}
                >
                  <Text
                    style={[
                      styles.optionText,
                      info.goal === item.value && styles.optionTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={async () => {
                try {
                  await saveInfo(info);
                  // navigation.navigate("Login");
                  Alert.alert("Successfully save your information");
                } catch (error) {
                  Alert.alert("Failed to save your information", error.message);
                }
              }}
            >
              <View style={styles.btn}>
                <Text style={styles.btnText}>Calculate Calorie</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: black,
    padding: 24,
    flex: 1,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: white,
    marginBottom: 8,
  },
  inputControl: {
    height: 40,
    backgroundColor: grey,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: white,
  },
  form: {
    marginBottom: 24,
    flex: 1,
  },
  formAction: {
    marginVertical: 24,
    flex: 1,
    alignItems: "center",
  },
  btn: {
    width: 200,
    backgroundColor: brightBlue,
    borderRadius: 12,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
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
  },
  optionRow: {
    flexDirection: "row",
    gap: 10,
  },

  optionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: grey,
    alignItems: "center",
    borderWidth: 1,
  },

  optionBtnActive: {
    backgroundColor: brightBlue,
    borderColor: brightBlue,
  },

  optionText: {
    color: white,
    fontWeight: "600",
  },

  optionTextActive: {
    color: white,
  },
  dropdown: {
    height: 50,
    backgroundColor: grey,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
  },

  dropdownContainer: {
    backgroundColor: grey,
    borderRadius: 12,
    borderWidth: 1,
  },

  placeholderStyle: {
    color: white,
  },

  selectedTextStyle: {
    color: white,
    fontWeight: "500",
  },

  itemTextStyle: {
    color: white,
  },
});
