import { useNavigation } from "@react-navigation/native";
import { styles } from '../components/styles'
import { View, Text, Image, ImageBackground, TouchableOpacity } from "react-native";

export default function HomeScreen() {
    const navigation = useNavigation()
    return (
        <View style={styles.styledContainer}>
            <View style={styles.innerContainer}>
                <Text style={styles.pageTitle}>Calorie Calculator</Text>
                <Image
                    resizeMode='contain'
                    source={require('./../assets/welcome-image.png')}
                    style={styles.pageLogo}
                />
                <Card
                    title="Manage Profile"
                    description="Update your body info."
                    icon={require('../assets/card-3-icon.png')}
                />
                <Card
                    title="Track your calories"
                    description="Set your goals and monitor your intake."
                    icon={require('../assets/card-1-icon.png')}
                />
                <Card
                    title="View Progress"
                    description="Analyze your daily results."
                    icon={require('../assets/card-2-icon.png')}
                />
                <TouchableOpacity 
                    style={styles.getStartedButton}
                    onPress={() => navigation.navigate('Calculator')}
                >
                    <Text style={styles.getStartedText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Card = ({ title, icon, description }) => {
    return (
        <ImageBackground
            source={require('../assets/white-background.jpg')}
            style={styles.background}
            imageStyle={styles.image}
        >
            <View style={styles.cardContainer}>
                <View style={styles.row}>
                    {icon && <Image source={icon} style={styles.leftIcon} />}
                    <View style={{ flex: 1 }}>
                        <Text style={styles.cardTitle}>{title}</Text>
                        <Text style={styles.cardDescription}>{description}</Text>
                    </View>
                </View>
            </View>
        </ImageBackground>

    )
}