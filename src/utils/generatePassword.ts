import { generateUUID } from "./uuidGenerator"

export function generatePassword(passwordLength: number) {
  const rawPassword = generateUUID().replace(/-/g, '')

  const newPassword = rawPassword.slice(1, passwordLength + 1)

  return newPassword
}