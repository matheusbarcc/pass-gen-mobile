import { api } from "../../lib/axios"
import { getItem, removeItem, setItem } from "../../storage/localStorage"
import { AUTH_TOKEN_STORAGE } from "../../storage/storageConfig"

type SignUpRequest = {
  name: string
  email: string
  birthday: string
  password: string
}

async function signIn(email: string, password: string) {
  try {
    const { data } = await api.post('/signin', {
      email,
      password
    })

    await setItem(AUTH_TOKEN_STORAGE, data.token)

    return data
  } catch (error) {
    throw error
  }

}

async function signUp({
  name,
  email,
  birthday,
  password,
}: SignUpRequest) {
  return await api.post('/signup', {
    name,
    email,
    birthday,
    password,
  })
}

async function signOut() {
  await removeItem(AUTH_TOKEN_STORAGE)
}

async function getAuthToken() {
  const token = getItem(AUTH_TOKEN_STORAGE)

  return token
}

export { SignUpRequest, signIn, signUp, signOut, getAuthToken }