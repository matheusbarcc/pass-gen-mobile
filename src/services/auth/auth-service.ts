import * as authResource from './auth-resource'

function signIn(email: string, password: string) {
    return authResource
            .signIn(email, password)
            .then((response) => response.data)
}

function signUp({
    name,
    email,
    password,
    confirmPassword,
    birthDay
}: authResource.SignUpRequest) {
    return authResource
            .signUp({
                name,
                email,
                password,
                confirmPassword,
                birthDay
            })
            .then((response) => response.data)
}

function signOut() {
    return authResource.signOut().then((response) => response.data)
}

export { signIn, signUp, signOut }