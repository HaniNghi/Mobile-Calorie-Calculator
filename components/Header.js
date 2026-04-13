import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity, View, Text , StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
// Colors
import {
  black,
  grey,
  white,
  muted,
  darkLight,
  brightBlue,
  lightBlue,
} from "../components/styles";



export default function Header ({ title, onBackPress, showBack }){
    const navigation = useNavigation()

    const handleBack = () => {
        if (onBackPress) {
            onBackPress()
        } else {
            navigation.goBack()
        }
    }

    return (
        <View style={styles.headerContainer}>
            {showBack && (
                <TouchableOpacity
                    onPress={handleBack}
                    style={styles.headerBackButton}
                >
                    <Ionicons
                        name="chevron-back"
                        size={24}
                        color="#fff"
                    />
                </TouchableOpacity>
            )}
            <Text style={styles.headerTitle}>{title}</Text>

            {/* Spacer for alignment */}
            {showBack && <View style={styles.headerRightSpace} />}
        </View>
    )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    backgroundColor: brightBlue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderRadius: 5,
  },

  headerBackButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: white,
    fontSize: 18,
    fontWeight: "700",
  },

  headerRightSpace: {
    width: 40, 
  },
});