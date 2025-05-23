import { api } from "../../lib/axios"
import { setItem } from "../../storage/localStorage"
import { USER_STORAGE } from "../../storage/storageConfig"

type UserDTO = {
  name: string
  email: string
  birthday: Date
}

async function getAuthenticatedUser() {
  try {
    const { data } = await api.get('/me')

    await setItem(USER_STORAGE, JSON.stringify(data.user))

    return data
  } catch (error) {
    throw error
  }
}

async function updateUser({ name, email, birthday }: UserDTO) {
  try {
    await api.put('/me', {
      name,
      email,
      birthday
    })

  } catch (error) {
    throw error
  }
}

export { UserDTO, getAuthenticatedUser, updateUser }