import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { database } from "../firebaseConfig";
import { push, getDatabase, ref, set, get, remove } from "firebase/database";

export async function createUser(inputUser) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      inputUser.email,
      inputUser.password,
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
      password,
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
  console.log(info);
}

export async function getInfo() {
  try {
    const user = auth.currentUser;
    if (!user) return null;

    const snapshot = await get(ref(database, `info/${user.uid}`));

    if (snapshot.exists()) {
      console.log("getInfo ", snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data found");
      return null;
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
}

export async function saveResult(result) {
  set(ref(database, "result/" + auth.currentUser.uid), {
    tdee: result.tdee,
    goalCalories: result.goalCalories,
  });
  console.log(result);
}

export async function getResult() {
  try {
    const user = auth.currentUser
    if (!user) return null;

    const snapshot = await get(ref(database, `result/${user.uid}`));

    if (snapshot.exists()) {
      console.log("getResult ", snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data found");
      return null;
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
}

export async function saveDefaultFood(food) {
  const newRef = push(ref(database, "food"));

  return set(newRef, {
    id: newRef.key,
    name: food.name,
    kcal: food.kcal,
    unit: food.unit,
  });
}

export async function getDefaultFoods() {
  try {
    const snapshot = await get(ref(database, "food"));

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data found");
      return null;
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
}

export async function addFoodToDay(date, food) {
  try {
    const mealRef = ref(database, `dayfoods/${auth.currentUser.uid}/${date}`);

    await push(mealRef, {
      name: food.name,
      kcal: food.kcal,
      unit: food.unit,
      amount: food.amount,
    });
  } catch (error) {
    console.log("Error adding food:", error.message);
  }
}
export async function getDayFoods(date) {
  try {
    const snapshot = await get(
      ref(database, `dayfoods/${auth.currentUser.uid}/${date}`),
    );

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data found");
      return null;
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
}
export async function deleteFoodFromDay(date, id) {
  try {
    await remove(ref(database, `dayfoods/${auth.currentUser.uid}/${date}/${id}`));
  } catch (error) {
    console.log("Error deleting:", error.message);
  }
}

export async function saveCustomFood(food) {
    const user = auth.currentUser

  if (!user) throw new Error("User not logged in");

  try {
    const customFoodRef = push(ref(database, `customFoods/${user.uid}`));

    await set(customFoodRef, {
      id: customFoodRef.key,
      name: food.name,
      kcal: food.kcal,
      unit: food.unit,
    });
  } catch (error) {
    console.log("Error adding custom food:", error.message);
  }
}

export async function getUserFoods() {
    const user = auth.currentUser

  if (!user) return [];
  const snapshot = await get(ref(database, `customFoods/${user.uid}`));

  if (snapshot.exists()) {
    const data = snapshot.val();

    return Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
  }

  return [];
}
