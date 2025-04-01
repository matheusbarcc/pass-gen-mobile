import AsyncStorage from "@react-native-async-storage/async-storage"

import { DayList, PASSWORD_COLLETION } from "./storageConfig"

export async function getAllPasswords() {
  try {
    const storedPasswords = await AsyncStorage.getItem(PASSWORD_COLLETION)
    const passwords: DayList[] = storedPasswords ? JSON.parse(storedPasswords) : []

    return passwords
  } catch (error) {
    throw error
  }
}