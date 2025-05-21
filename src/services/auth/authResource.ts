import { api } from "../../lib/axios"

type SignUpRequest = {
    name: string
    email: string
    password: string
    confirmPassword: string
}

function signIn(email: string, password: string) {
    return api.post('/auth/signin', {
        email,
        password
    })
}

function signUp({
    name,
    email,
    password,
    confirmPassword,
}: SignUpRequest) {
    return api.post('/auth/signup', {
        name,
        email,
        password,
        confirmPassword,
    })
}

export { SignUpRequest, signIn, signUp }