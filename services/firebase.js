import { createUserWithEmailAndPassword, updateProfile , signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

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