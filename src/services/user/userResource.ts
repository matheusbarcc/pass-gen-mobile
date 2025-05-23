import { api } from "../../lib/axios"
import { setItem } from "../../storage/localStorage"
import { USER_STORAGE } from "../../storage/storageConfig"

async function getAuthenticatedUser() {
  try {
    const { data } = await api.get('/me')

    await setItem(USER_STORAGE, JSON.stringify(data.user))

    return data
  } catch (error) {
    throw error
  }
}

export { getAuthenticatedUser }