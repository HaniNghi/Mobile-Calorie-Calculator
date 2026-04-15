import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
// Colors
import { black, grey, white, muted, darkLight, brightBlue } from "../styles";
import Header from '../components/Header'

export default function Result() {
  const [result, setResult] = useState();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: black }}>
      <Header 
                title={"Result"}
                showBack={true}
              />
      <View>
        <Text style={styles.title}>Your daily calorie needs</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: white,
    alignSelf: "center",
    fontSize: 20,
    marginTop: 50,
  },

});
