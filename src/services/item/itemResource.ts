import { api } from "../../lib/axios"

async function createItem(label: string, password: string) {
  try {
    await api.post('/items', {
      label,
      password
    })
  } catch (error) {
    throw error
  }
}

export { createItem }