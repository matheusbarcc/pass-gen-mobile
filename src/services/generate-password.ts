import { generateUUID } from "../utils/uuid-generator";

export function generatePassword() {
    const password = generateUUID().slice(0, 8)

    return password
}