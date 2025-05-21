import { api } from "../../lib/axios"

type SignUpRequest = {
    name: string
    email: string
    birthday: Date
    password: string
}

async function signIn(email: string, password: string) {
    return await api.post('/signin', {
        email,
        password
    })
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

export { SignUpRequest, signIn, signUp }