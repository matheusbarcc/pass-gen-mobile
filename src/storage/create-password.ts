import AsyncStorage from '@react-native-async-storage/async-storage'
import { v4 as uuidv4 } from 'uuid'
import { PASSWORD_COLLETION } from './storageConfig'
import { getAllPasswords } from './get-all-passwords'

export async function createPassword() {
  try {
    const storedPasswords = await getAllPasswords()
    const newPassword = uuidv4().slice(1, 8)

    const today = new Date().toLocaleDateString('pt-BR').replaceAll('/', '.')

    const dayAlreadyExists = storedPasswords.find(daylist => daylist.title === today)

    if (dayAlreadyExists) {
      storedPasswords.map(daylist => {
        if (daylist.title === today) {
          daylist.data.push(newPassword)
        }
      })
    } else {
      storedPasswords.push({ title: today, data: [newPassword] })
    }

    await AsyncStorage.setItem(PASSWORD_COLLETION, JSON.stringify(storedPasswords))

    return newPassword
  } catch (error) {
    throw error
  }
}