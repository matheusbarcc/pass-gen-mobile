import { createContext, useEffect, useState } from "react"

import {
    signIn,
    signUp
} from '../services/auth/auth-service'

import * as localStorage from '../storage/local-storage'

import { api } from "../lib/axios"

interface AuthContextProps {
    authState?: {
        token: string | null
        authenticated: boolean | null
    }
    onRegister?: (
        name: string,
        email: string,
        password: string,
        confirmPassword: string
    ) => Promise<any>
    onLogin?: (email: string, password: string) => Promise<any>
    onLogout?: () => Promise<any>
}

interface AuthenticatedProps {
    token: string | null
    authenticated: boolean | null
}

interface AuthProviderProps {
    children: React.ReactNode
}

const TOKEN_KEY = "access-token"

export const AuthContext = createContext<AuthContextProps>({})


export function AuthProvider({ children }: AuthProviderProps) {
    const [authState, setAuthState] = useState<AuthenticatedProps>({
        token: null,
        authenticated: null
    })

    useEffect(() => {
        async function loadToken() {
            const token = await localStorage.getItem(TOKEN_KEY)

            if(token) {
                api.defaults.headers.common["Authorization"] = `${token}`
            }

            setAuthState({
                token,
                authenticated: true
            })
        }

        loadToken()
    }, [])

    async function register(
        name: string,
        email: string,
        password: string,
        confirmPassword: string
    ) {
        try {
            await signUp({
                name,
                email,
                password,
                confirmPassword
            })
        } catch (error) {
            throw error
        }
    }

    async function login(email: string, password: string) {
        try {
            const result = await signIn( email, password )

            setAuthState({
                authenticated: true,
                token: result.token
            })

            api.defaults.headers.common["Authorization"] = `${result.token}`
            
            await localStorage.setItem(TOKEN_KEY, result.token)
        } catch (error) {
            throw error
        }
    }

    async function logout() {
        try {
            await localStorage.removeItem(TOKEN_KEY)

            api.defaults.headers.common["Authorization"] = ""

            setAuthState({
                token: null,
                authenticated: null
            })

        } catch (error) {
            throw error
        }
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}