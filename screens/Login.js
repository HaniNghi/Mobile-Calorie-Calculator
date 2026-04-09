import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import {
  black,
  white,
  muted,
  darkLight,
  brightBlue,
} from "../components/styles";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";

import { login } from "../services/firebase";

export default function Login() {
  const navigation = useNavigation();
  // login form: email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // submit signin
  const handleSubmit = async () => {
    try {
      await login(email, password);
      navigation.navigate("Home");
      Alert.alert("Successfully logged in");
    } catch (error) {
      Alert.alert("Fail to log in", error.message);
    }
  };
  // 1. find user by email
  // 2. if user exist -> check password
  // 2.1 if password correct -> to home
  // 2.2. if password incorrect -> alert "credentials are invalid"

  // 3. if user not exist -> alert "credentials are invalid"

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: black }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("./../assets/logo.png")}
            style={styles.headerImg}
            alt="Logo"
          />
          <Text style={styles.title}>Sign in</Text>
          <Text style={styles.subTitle}>Get access to your porfolio</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              style={styles.inputControl}
              placeholder="john@example.com"
              placeholderTextColor={white}
              value={email}
              onChangeText={(email) => setEmail(email)}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              secureTextEntry
              style={styles.inputControl}
              placeholder="******"
              placeholderTextColor={white}
              value={password}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign in</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{ marginTop: "auto" }}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.formFooter}>
              Dont't have an account?
              <Text style={{ textDecorationLine: "underline" }}> Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: black,
    padding: 24,
    flex: 1,
  },
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 36,
  },
  title: {
    fontSize: 27,
    fontWeight: "700",
    color: white,
    marginBottom: 6,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: muted,
    marginBottom: 6,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: white,
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: darkLight,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: white,
  },
  form: {
    marginBottom: 24,
    flex: 1,
  },
  formAction: {
    marginVertical: 24,
    flex: 1,
    alignItems: "center",
  },
  formFooter: {
    fontSize: 17,
    fontWeight: "600",
    color: white,
    textAlign: "center",
    letterSpacing: 0.15,
  },
  btn: {
    width: 200,
    backgroundColor: brightBlue,
    borderRadius: 12,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 20,
    shadowColor: brightBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  btnText: {
    color: white,
    fontSize: 17,
    fontWeight: "600",
  },
});
