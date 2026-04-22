import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button, TouchableOpacity, StyleSheet } from "react-native";
// Colors
import { black, grey, white, brightBlue } from "../styles";
import { logout } from "../services/firebase";

export default function Info() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: black }}>
      <Text style={{ color: white }}>Your Info</Text>
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

  saveText: {
    color: white,
    fontSize: 16,
    fontWeight: "700",
  },
});
