import AsyncStorage from "@react-native-async-storage/async-storage";

import { PASSWORD_COLLETION } from "./storageConfig";

export async function removeAllPasswords() {
  try {
    await AsyncStorage.removeItem(PASSWORD_COLLETION)
  } catch (error) {
    throw error
  }
}