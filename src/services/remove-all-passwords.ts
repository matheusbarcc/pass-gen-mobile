import { storageRemoveAll } from "../storage/local-storage";
import { PASSWORD_COLLETION } from "../storage/storageConfig";

export async function removeAllPasswords() {
    await storageRemoveAll(PASSWORD_COLLETION)
}