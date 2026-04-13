import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";



export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.styledContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.pageTitle}>Calorie</Text>
        <Text style={styles.pageTitle}>Calculator</Text>
        <Text style={styles.pageSubTitle}>
          Understand your body. Control your calories. Achieve your health
          goals.
        </Text>

        <Image
          resizeMode="contain"
          source={require("./../assets/logo.png")}
          style={styles.pageLogo}
        />
        <Card
          title="Calorie calculation"
          description="Calculate your daily calorie needs to match your goals."
          icon={require("../assets/card-1-icon.png")}
        />
        <Card
          title="Track your calories and exercise"
          description="Record your food and exercise to easily track calories."
          icon={require("../assets/card-2-icon.png")}
        />
        <Card
          title="View visual statistics"
          description="Weekly and monthly calorie tracking chart."
          icon={require("../assets/card-3-icon.png")}
        />
        
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate("Calculator")}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Card = ({ title, icon, description }) => {
  return (
    <View style={styles.background}>
      <View style={styles.cardContainer}>
        <View style={styles.row}>
          {icon && <Image source={icon} style={styles.leftIcon} />}
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardDescription}>{description}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
