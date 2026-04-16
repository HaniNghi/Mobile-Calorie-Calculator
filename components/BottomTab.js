import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import CalculatorScreen from "../screens/CalculatorScreen";

import { black, brightBlue, grey } from "../styles";
import Result from "../screens/Result";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: black,
          borderTopColor: brightBlue,
          height: 60,
          paddingBottom: 10,
        },

        tabBarActiveTintColor: brightBlue,
        tabBarInactiveTintColor: grey,

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Calculator") {
            iconName = "calculator";
          } else if (route.name === "Result") iconName = "accessibility-outline";

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calculator" component={CalculatorScreen} />
      <Tab.Screen name="Result" component={Result}/>
    </Tab.Navigator>
  );
}
