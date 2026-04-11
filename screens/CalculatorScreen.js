import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: black }}>
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
            <TextInput
              autoCorrect={false}
              style={styles.inputControl}
              placeholder="20"
              placeholderTextColor={white}
              value={info.gender}
              onChangeText={(gender) => setInfo({ ...info, gender })}
            />
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
            <TextInput
              autoCorrect={false}
              style={styles.inputControl}
              placeholder="Moderate Exercise"
              placeholderTextColor={white}
              value={info.activityLevel}
              onChangeText={(activityLevel) =>
                setInfo({ ...info, activityLevel })
              }
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Goal</Text>
            <TextInput
              autoCorrect={false}
              style={styles.inputControl}
              placeholder="Lose weight"
              placeholderTextColor={white}
              value={info.goal}
              onChangeText={(goal) => setInfo({ ...info, goal })}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity
            // onPress={async () => {
            //   try {
            //     await createUser(form);
            //     navigation.navigate("Login");
            //     Alert.alert("Successfully sign up");
            //   } catch (error) {
            //     Alert.alert("Failed to create user", error.message || "An error occurred");
            //   }
            // }}
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

    shadowColor: brightBlue,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
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
});
