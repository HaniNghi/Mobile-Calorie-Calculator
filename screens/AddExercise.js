import { View, Text, Button } from "react-native";
import { black, white } from "../styles";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddExercise() {

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: black }}>
      <Header title={"Add food"} showBack={true}/>
      <Text style={{color: white}}>Add exercise</Text>
    </SafeAreaView>
  );
}