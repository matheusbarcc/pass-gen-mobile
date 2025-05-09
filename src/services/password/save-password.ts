import { getItem, setItem } from "../../storage/local-storage";
import { Password, PASSWORD_COLLETION } from "../../storage/storageConfig";

export async function savePassword({ title, value }: Password) {
    const storage = await getItem(PASSWORD_COLLETION)
    
    if(storage === null) {
        return
    }

    const passwords = JSON.parse(storage)


    passwords.push({title, value})

    await setItem(PASSWORD_COLLETION, passwords)
}