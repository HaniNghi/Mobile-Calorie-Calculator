import { styles } from '../components/styles'
import React from "react";
import { View, Text } from "react-native";
import { Header } from '../components/Header';

export default function CalculatorScreen() {
    return(
        <View style={styles.container}>
            {/* <Header title="ENTER YOUR DETAILS" showBack={true}/> */}
            <Text>Calculator screen</Text>
        </View>
    )
}