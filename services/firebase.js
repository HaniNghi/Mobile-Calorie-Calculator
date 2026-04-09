import { Database, getDatabase, ref, set } from "firebase/database";
import { database } from "../firebaseConfig";

export async function createUser(user) {
  set(ref(database, "users/" + user.id), {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    password: user.password,
  });
}
