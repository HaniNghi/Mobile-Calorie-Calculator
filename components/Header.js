import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity, View, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { styles } from "./styles"

export const Header = ({ title, onBackPress, showBack }) => {
    const navigation = useNavigation

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