import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function FoodCard({
  name,
  kcal,
  unit,
  amount,
  onAdd,
  onDelete,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text>{name}</Text>
        <Text>
          {kcal} kcal/ 100 {unit}
        </Text>
        {amount && (
          <Text>
            Amount: {amount} {unit} - {Math.round(kcal * (amount / 100))} kcal
          </Text>
        )}
      </View>
      {onAdd && (
        <TouchableOpacity onPress={onAdd}>
          <Text style={{ fontSize: 18 }}>＋</Text>
        </TouchableOpacity>
      )}
      {onDelete && (
        <TouchableOpacity onPress={onDelete}>
        <Text style={{ fontSize: 18 }}>-</Text>
      </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
  },
  info: {
    display: "flex",
    flexDirection: "column",
  },
});
