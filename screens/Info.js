import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Button, TouchableOpacity, StyleSheet , Alert} from "react-native";
// Colors
import { black, grey, white, brightBlue } from "../styles";
import { logout } from "../services/firebase";
import InfoForm from "../components/InfoForm";
import { useEffect, useState } from "react";
import { getInfo , saveInfo} from "../services/firebase";

export default function Info() {
  const handleLogout = async () => {
    await logout();
  };
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
      const infoFromFirebase = await getInfo();

      if (infoFromFirebase) {
        setInfo(infoFromFirebase);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
      try {
        await saveInfo(info);
        Alert.alert("Successfully save your information");
      } catch (error) {
        Alert.alert("Failed to save your information", error.message);
      }
    };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: black }}>
      <Text style={{ color: white }}>Your Info</Text>
      <View style={styles.container}>
        <InfoForm
          info={info}
          setInfo={setInfo}
          handleSave={handleSave}
          buttonText={"Save changes"}
        />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleLogout}>
        <Text style={styles.saveText}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  saveBtn: {
    backgroundColor: brightBlue,
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: brightBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  container: {
    backgroundColor: black,
    padding: 24,
    flex: 1,
  },

  saveText: {
    color: white,
    fontSize: 16,
    fontWeight: "700",
  },
});
