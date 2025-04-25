import { storageRemoveByValue } from "../../storage/local-storage";
import { PASSWORD_COLLETION } from "../../storage/storageConfig";

export async function removePasswordByValue(value: string) {
    await storageRemoveByValue(PASSWORD_COLLETION, value)
}