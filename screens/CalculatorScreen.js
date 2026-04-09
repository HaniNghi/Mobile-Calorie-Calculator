import { styles } from '../components/styles'
import React from "react";
import { View, Text } from "react-native";
import { Header } from '../components/Header';

export default function CalculatorScreen() {
    return(
        <View style={styles.styledContainer}>
            <Text style={styles.pageTitle}>Calculator screen</Text>
        </View>
    )
}