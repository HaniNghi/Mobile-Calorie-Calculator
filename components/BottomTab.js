import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { black, brightBlue, grey } from "../styles";
import Result from "../screens/Result";
import Diary from "../screens/Diary";
import Graph from "../screens/Graph"
import AddFood from "../screens/AddFood";

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

          if (route.name === "Diary") {
            iconName = "body-outline";
          } else if (route.name === "Graph") {
            iconName = "analytics-outline";
          } 
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Diary" component={Diary} />
      <Tab.Screen name="Graph" component={Graph}/>
    </Tab.Navigator>
  );
}
