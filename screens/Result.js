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

export default function Result() {
    const [result, setResult] = useState()


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: black }}>
            <Text>Your daily calorie needs</Text>
        </SafeAreaView>
    )
}