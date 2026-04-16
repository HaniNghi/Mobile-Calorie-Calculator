import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native"
// Colors
import { black, grey, white, brightBlue } from "../styles";

export default function Graph() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: black }}>
            <Text style={{color: white}}>Your graph</Text>
        </SafeAreaView>
    )

}