import { createContext, useEffect, useState } from "react"

import {
    signIn,
    signUp
} from '../services/auth/authService'

import * as localStorage from '../storage/localStorage'

import { api } from "../lib/axios"
import { AUTH_TOKEN_STORAGE } from "../storage/storageConfig"

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

export const AuthContext = createContext<AuthContextProps>({})


export function AuthProvider({ children }: AuthProviderProps) {
    const [authState, setAuthState] = useState<AuthenticatedProps>({
        token: null,
        authenticated: null
    })

    useEffect(() => {
        async function loadToken() {
            const token = await localStorage.getItem(AUTH_TOKEN_STORAGE)

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
            
            await localStorage.setItem(AUTH_TOKEN_STORAGE, result.token)
        } catch (error) {
            throw error
        }
    }

    async function logout() {
        try {
            await localStorage.removeItem(AUTH_TOKEN_STORAGE)

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