import { generateUUID } from "./uuidGenerator"

export function generatePassword() {
  const newPassword = generateUUID().slice(1, 8)

  return newPassword
}