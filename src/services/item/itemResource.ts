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

async function fetchUserItems() {
  try {
    const { data } = await api.get('/items')

    return data
  } catch (error) {
    throw error
  }
}

export { createItem, fetchUserItems }