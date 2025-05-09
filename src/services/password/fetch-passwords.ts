import { getItem } from "../../storage/local-storage";
import { PASSWORD_COLLETION } from "../../storage/storageConfig";

export async function fetchPasswords() {
    const passwords = await getItem(PASSWORD_COLLETION)

    return passwords
}