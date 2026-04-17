import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import CalculatorScreen from "./screens/CalculatorScreen";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, database } from "./firebaseConfig";
import BottomTab from "./components/BottomTab";
import Result from "./screens/Result";
import Diary from "./screens/Diary";
import { getResult } from "./services/firebase";
import AddFood from "./screens/AddFood";
import AddExercise from "./screens/AddExercise";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [hasResult, setHasResult] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const resultFromDatabase = await getResult();
        if (resultFromDatabase) {
          setHasResult(true);
        }
      } else {
        setHasResult(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      {user ? (
        // USER IS LOGGED IN
        hasResult ? (
          // USER HAS RESULT
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={BottomTab} />
            <Stack.Screen name="AddFood" component={AddFood} />
            <Stack.Screen name="AddExercise" component={AddExercise} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Calculator" component={CalculatorScreen} />
            <Stack.Screen name="Result" component={Result} />
          </Stack.Navigator>
        )
      ) : (
        // USER NOT LOGGED IN
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
