import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// Colors
import {
  black,
  grey,
  white,
  muted,
  darkLight,
  brightBlue,
  lightBlue,
} from "../styles";

export default function Header({
  title,
  onBackPress,
  showBack,
  showDone,
  onDonePress,
}) {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const handleDone = () => {
    if (onDonePress) {
      onDonePress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.headerContainer}>
      {/* BACK BUTTON */}
      {showBack && (
        <TouchableOpacity onPress={handleBack} style={styles.leftBtn}>
          <Ionicons name="chevron-back" size={24} color={white} />
        </TouchableOpacity>
      )}

      {/* TITLE */}
      <Text style={styles.headerTitle}>{title}</Text>

      {/* DONE BUTTON */}
      {showDone && (
        <TouchableOpacity onPress={handleDone} style={styles.rightBtn}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    backgroundColor: brightBlue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderRadius: 5,
  },

  headerBackButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: white,
    fontSize: 18,
    fontWeight: "700",    
  },

  leftBtn: {
    position: "absolute",
    left: 16,
    height: 40,
    justifyContent: "center",
  },

  rightBtn: {
    position: "absolute",
    right: 16,
    height: 40,
    justifyContent: "center",
  },

  doneText: {
    color: white,
    fontSize: 16,
    fontWeight: "600",
  },
});
