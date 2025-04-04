import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllPasswords } from "./get-all-passwords";
import { PASSWORD_COLLETION } from "./storageConfig";

export async function removePasswordByValue(password: string) {
    try {
        const storedPasswords = await getAllPasswords()

        const passwords = storedPasswords.filter(daylist => {
            daylist.data.filter(p => p !== password)
        })

        await AsyncStorage.setItem(PASSWORD_COLLETION, password)
    } catch (error) {
        throw Error
    }
}