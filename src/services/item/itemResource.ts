import { api } from "../../lib/axios"

type CreateItemRequest = {
  label: string
  password: string
}

async function createItem({ label, password }: CreateItemRequest) {
  try {
    await api.post('/items', {
      label,
      password
    })
  } catch (error) {
    throw error
  }
}