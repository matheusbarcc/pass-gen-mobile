import { storageGetAll, storageSave } from "../../storage/local-storage";
import { Password, PASSWORD_COLLETION } from "../../storage/storageConfig";

export async function savePassword({ title, value }: Password) {
    const storedPasswords = await storageGetAll(PASSWORD_COLLETION)

    storedPasswords.push({title, value})

    await storageSave(PASSWORD_COLLETION, storedPasswords)
}