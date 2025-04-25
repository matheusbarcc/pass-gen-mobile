import { api } from "../../lib/axios"

type SignUpRequest = {
    name: string
    email: string
    password: string
    confirmPassword: string
    birthDay: string
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
    birthDay
}: SignUpRequest) {
    return api.post('/auth/signup', {
        name,
        email,
        password,
        confirmPassword,
        birthDay
    })
}
function signOut() {
    return api.get('/auth/signout')
}

export { SignUpRequest, signIn, signUp, signOut }