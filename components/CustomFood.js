import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import {
  black,
  brightBlue,
  faded,
  grey,
  lightBlue,
  muted,
  white,
} from "../styles";
import { Dropdown } from "react-native-element-dropdown";

export default function CustomFood({ onSave }) {
  const [customFood, setCustomFood] = useState({
    name: "",
    kcal: 0,
    unit: "",
  });

  const handleSave = () => {
    if (!customFood.kcal || isNaN(customFood.kcal)) {
      alert("Enter valid kcal");
      return;
    }

    if (!customFood.name) {
      alert("Enter valid name");
      return;
    }

    if (!customFood.unit) {
      alert("Please select unit");
      return;
    }

    onSave(customFood);
  };

  return (
    <View>
      <View style={styles.card}>
        {/* Name */}
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Food Name</Text>
          <TextInput
            style={styles.inputControlName}
            placeholder="Watermelon"
            placeholderTextColor={muted}
            value={customFood.name}
            onChangeText={(name) => setCustomFood({ ...customFood, name })}
          />
        </View>

        {/* Kcal */}
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Kcal</Text>
          <TextInput
            style={styles.inputControlKcal}
            placeholder="60"
            placeholderTextColor={muted}
            keyboardType="numeric"
            value={customFood.kcal}
            onChangeText={(kcal) => setCustomFood({ ...customFood, kcal })}
          />
        </View>

        {/* Unit */}
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Unit</Text>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.itemTextStyle}
            activeColor={black}
            data={[
              { label: "Gram", value: "gram" },
              { label: "Ml", value: "ml" },
            ]}
            labelField="label"
            valueField="value"
            placeholder=""
            value={customFood.unit}
            onChange={(item) =>
              setCustomFood({ ...customFood, unit: item.value })
            }
          />
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Food</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: black,
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#222",
    flexDirection: "row",
  },

  input: {
    marginBottom: 5,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: white,
    marginBottom: 6,
  },

  inputControlName: {
    height: 45,
    backgroundColor: grey,
    paddingHorizontal: 14,
    borderRadius: 12,
    fontSize: 15,
    color: white,
    width: 180,
    marginRight: 5,
  },
  inputControlKcal: {
    height: 45,
    backgroundColor: grey,
    paddingHorizontal: 14,
    borderRadius: 12,
    fontSize: 15,
    color: white,
    width: 80,
    marginRight: 5,

  },

  dropdown: {
    height: 45,
    backgroundColor: grey,
    borderRadius: 12,
    paddingHorizontal:10,
    width: 70,
  },

  dropdownContainer: {
    backgroundColor: grey,
    borderRadius: 12,
    borderWidth: 0,
  },

  placeholderStyle: {
    color: muted,
  },

  selectedTextStyle: {
    fontSize: 11,
    color: white,
    fontWeight: "500",
    backgroundColor: grey,
  },

  itemTextStyle: {
    fontSize: 11,
    color: white,
  },

  saveBtn: {
    backgroundColor: brightBlue,
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: brightBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  saveText: {
    color: white,
    fontSize: 16,
    fontWeight: "700",
  },
});
