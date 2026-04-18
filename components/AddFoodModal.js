import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

export default function AddFoodModal({
  visible,
  food,
  onClose,
  onSave
}) {
  const [amount, setAmount] = useState("100");

  // Reset amount when new food is selected
  useEffect(() => {
    if (food) {
      setAmount("100");
    }
  }, [food]);

  const handleSave = () => {
    if (!amount || isNaN(amount)) {
      alert("Enter valid amount");
      return;
    }

    onSave(Number(amount));
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)"
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            width: "80%"
          }}
        >
          <Text style={{ fontSize: 18 }}>
            {food?.name}
          </Text>

          <Text>Amount ({food?.unit})</Text>

          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              marginVertical: 10,
              padding: 10
            }}
          />

          {/* Optional kcal preview */}
          {food && (
            <Text>
              {Math.round(food.kcal * (amount / 100))} kcal
            </Text>
          )}

          <TouchableOpacity
            onPress={handleSave}
            style={{ backgroundColor: "black", padding: 10, marginTop: 10 }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Save
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}