import { View, Text, Button } from "react-native";
import { saveDefaultFood } from "../services/firebase";

export default function UploadFood() {
  const fds = [
  { id: "1", name: "Grilled Chicken Breast", kcal: 165, unit: "gram" },
  { id: "2", name: "White Rice", kcal: 130, unit: "gram" },
  { id: "3", name: "Boiled Egg", kcal: 70, unit: "gram" },
  { id: "4", name: "Banana", kcal: 105, unit: "gram" },
  { id: "5", name: "Oatmeal", kcal: 389, unit: "gram" },
  { id: "6", name: "Unsweetened Milk", kcal: 60, unit: "ml" },

  { id: "7", name: "Apple", kcal: 95, unit: "gram" },
  { id: "8", name: "Salmon", kcal: 208, unit: "gram" },
  { id: "9", name: "Broccoli", kcal: 55, unit: "gram" },
  { id: "10", name: "Avocado", kcal: 160, unit: "gram" },
  { id: "11", name: "Egg Fried Rice", kcal: 250, unit: "gram" },
  { id: "12", name: "Beef Steak", kcal: 271, unit: "gram" },
  { id: "13", name: "Sweet Potato", kcal: 86, unit: "gram" },
  { id: "14", name: "Pasta", kcal: 131, unit: "gram" },
  { id: "15", name: "Tofu", kcal: 76, unit: "gram" },
  { id: "16", name: "Orange Juice", kcal: 45, unit: "ml" },
];

  const uploadFoods = async () => {
    try {
      fds.map(async (food)=>{
        await saveDefaultFood(food)
      })
      alert("Upload success!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ marginTop: 100, alignItems: "center" }}>
      <Text>Upload Foods to Firebase</Text>
      <Button title="Upload" onPress={uploadFoods} />
    </View>
  );
}