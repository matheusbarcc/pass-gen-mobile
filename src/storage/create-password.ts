import AsyncStorage from '@react-native-async-storage/async-storage'
import { v4 as uuidv4 } from 'uuid'

import { getAllPasswords } from './get-all-passwords'
import { Password, PASSWORD_COLLETION } from './storageConfig'

export async function createPassword(password: Password) {
  try {
    const storedPasswords = await getAllPasswords()

    storedPasswords.push(password)

    await AsyncStorage.setItem(PASSWORD_COLLETION, JSON.stringify(storedPasswords))
  } catch (error) {
    throw error
  }
}