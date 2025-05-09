import { removeItem } from "../../storage/local-storage";
import { PASSWORD_COLLETION } from "../../storage/storageConfig";

export async function removeAllPasswords() {
    await removeItem(PASSWORD_COLLETION)
}