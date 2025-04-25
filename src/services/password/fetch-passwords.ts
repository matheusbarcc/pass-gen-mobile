import { storageGetAll } from "../../storage/local-storage";
import { PASSWORD_COLLETION } from "../../storage/storageConfig";

export async function fetchPasswords() {
    const passwords = await storageGetAll(PASSWORD_COLLETION)

    return passwords
}