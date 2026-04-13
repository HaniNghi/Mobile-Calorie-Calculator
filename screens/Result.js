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
import {
  black,
  grey,
  white,
  muted,
  darkLight,
  brightBlue,
} from "../styles";

export default function Result() {
    const [result, setResult] = useState()


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: black }}>
            <Text style={{color: white}}>Your daily calorie needs</Text>
        </SafeAreaView>
    )
}