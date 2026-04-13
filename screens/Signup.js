import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import {
  black,
  white,
  muted,
  darkLight,
  brightBlue,
} from "../styles";
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
import { createUser } from "../services/firebase";
// import { v4 as uuidv4 } from "uuid";
// import "react-native-get-random-values";

export default function Login() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: black }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("./../assets/logo.png")}
            style={styles.headerImg}
            alt="Logo"
          />
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subTitle}>Get access to your porfolio</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              autoCorrect={false}
              style={styles.inputControl}
              placeholder="John"
              placeholderTextColor={white}
              value={form.firstname}
              onChangeText={(firstname) => setForm({ ...form, firstname })}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              autoCorrect={false}
              style={styles.inputControl}
              placeholder="Hamly"
              placeholderTextColor={white}
              value={form.lastname}
              onChangeText={(lastname) => setForm({ ...form, lastname })}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              style={styles.inputControl}
              placeholder="john@example.com"
              placeholderTextColor={white}
              value={form.email}
              onChangeText={(email) => setForm({ ...form, email })}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              secureTextEntry
              style={styles.inputControl}
              placeholder="******"
              placeholderTextColor={white}
              value={form.password}
              onChangeText={(password) => setForm({ ...form, password })}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={async () => {
                try {
                  await createUser(form);
                  navigation.navigate("Login");
                  Alert.alert("Successfully sign up");
                } catch (error) {
                  Alert.alert("Failed to create user", error.message || "An error occurred");
                }
              }}
            >
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign up</Text>
              </View>
            </TouchableOpacity>
          </View>
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
