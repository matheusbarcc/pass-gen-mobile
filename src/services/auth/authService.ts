import * as authResource from './authResource'

async function signIn(email: string, password: string) {
    const response = await authResource.signIn(email, password)

    return response.data
}

async function signUp({
    name,
    email,
    birthday,
    password,
}: authResource.SignUpRequest) {
    await authResource.signUp({ name, email, birthday, password })
}

export { signIn, signUp }