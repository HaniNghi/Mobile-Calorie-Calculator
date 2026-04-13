import { createUserWithEmailAndPassword, updateProfile , signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { database } from "../firebaseConfig";
import { getDatabase, ref, set, get } from "firebase/database";

export async function createUser(inputUser) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      inputUser.email,
      inputUser.password
    );
    const user = userCredential.user;
    if (user) {
      await updateProfile(user, {
        displayName: `${inputUser.firstname} ${inputUser.lastname}`,
      });
    }
  } catch (error) {
    throw error;
  }
}

export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
  } catch (error) {
    throw error;
  }
}

export async function saveInfo(info) {
  set(ref(database, "info/" + auth.currentUser.uid), {
    age: info.age,
    gender: info.gender,
    height: info.height,
    weight: info.weight,
    activityLevel: info.activityLevel,
    goal: info.goal,
  });
  console.log(info)
}

export async function getInfo(){
  try {
    const user = auth.currentUser;
    if (!user) return null;

    const snapshot = await get(ref(database, `info/${user.uid}`));

    if (snapshot.exists()) {
      console.log("getInfo ",snapshot.val())
      return snapshot.val();
    } else {
      console.log("No data found");
      return null;
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
}