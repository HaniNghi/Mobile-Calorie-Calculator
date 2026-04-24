import React, { useEffect, useState } from "react";
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
import { getInfo, saveInfo } from "../services/firebase";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";

// Colors
import { black, grey, white, brightBlue } from "../styles";
import InfoForm from "../components/InfoForm";

export default function CalculatorScreen() {
  const navigation = useNavigation();
  const [hasInfo, setHasInfo] = useState(false);
  const [infoFromDatabase, setInfoFromDatabase] = useState({
    age: null,
    gender: null,
    height: null,
    weight: null,
    activityLevel: null,
    goal: null,
  });
  const [info, setInfo] = useState({
    age: null,
    gender: null,
    height: null,
    weight: null,
    activityLevel: null,
    goal: null,
  });

  const fetchInfo = async () => {
    try {
      const data = await getInfo();

      console.log("info from database", data);

      if (data) {
        setInfoFromDatabase(data);
        setHasInfo(true);
      } else {
        setHasInfo(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCalculate = async () => {
    try {
      await saveInfo(info);
      Alert.alert("Successfully save your information");
      navigation.navigate("Result", { info });
    } catch (error) {
      Alert.alert("Failed to save your information", error.message);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  useEffect(() => {
    if (infoFromDatabase) {
      setInfo(infoFromDatabase);
    }
  }, [infoFromDatabase]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: black }}>
      <Header title={"Enter your details"} showBack={true} />
      <View style={styles.container}>
        <InfoForm info={info} setInfo={setInfo} editable={true}/>
      <View style={styles.formAction}>
        <TouchableOpacity onPress={handleCalculate}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Calculate Calories</Text>
          </View>
        </TouchableOpacity>
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
