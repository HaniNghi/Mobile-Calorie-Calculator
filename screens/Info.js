import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Button, TouchableOpacity, StyleSheet , Alert} from "react-native";
// Colors
import { black, grey, white, brightBlue, blueGradient } from "../styles";
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

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: black }}>
      <Text style={styles.title}>Your Info</Text>
      <View style={styles.container}>
        <InfoForm
          info={info}
          setInfo={setInfo}
          editable={false}
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
    width: 200,
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 14,
    alignSelf: "center",
    alignItems: "center",
    shadowColor: brightBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  title: {
      color: white,
      textAlign: "center",
      marginBottom: 5,
      fontSize: 30,
      fontWeight: 600,
      marginTop: 10,
      shadowColor: blueGradient,
      shadowOpacity: 1,
      shadowRadius: 14,
      elevation: 6,
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
