import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { black, brightBlue, faded, grey, lightBlue, muted, white } from "../styles";

export default function AddFoodModal({ visible, food, onClose, onSave }) {
  const [amount, setAmount] = useState("100");

  // Reset amount when new food is selected
  useEffect(() => {
    if (food) {
      setAmount("100");
    }
  }, [food]);

  const handleSave = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Enter valid amount");
      return;
    }

    onSave(Number(amount));
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.background}>
        <View style={styles.box}>
          <Text style={styles.name}>{food?.name}</Text>

          <Text>Unit: {food?.unit}</Text>

          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={styles.input}
          />

          {/* Optional kcal preview */}
          {food && <Text>{Math.round(food.kcal * (amount / 100))} kcal</Text>}

          <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: faded,
  },
  box: {
    backgroundColor: muted,
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  name: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: grey,
    marginVertical: 10,
    padding: 10,
  },
  saveBtn: {
    backgroundColor: brightBlue,
    padding: 10,
    marginTop: 10,
  },
  saveText: {
    color: white,
    textAlign: "center",
  },
  cancel: {
    textAlign: "center",
    marginTop: 10,
  },
});
