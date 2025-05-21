import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { SignUpRequest } from "../services/auth/authResource";

import * as authService from '../services/auth/authService';

export type AuthContextDataProps = {
  signIn: (email: string, password: string) => Promise<any>
  signUp: (user: SignUpRequest) => Promise<void>
  signOut: () => Promise<void>
  isLoadingStoredToken: boolean
  authState?: {
    token: string | null
    authenticated: boolean | null
  }
}

interface AuthenticatedProps {
    token: string | null
    authenticated: boolean | null
}

export type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isLoadingStoredToken, setIsLoadingStoredToken] = useState(false)
  const [authState, setAuthState] = useState<AuthenticatedProps>({
          token: null,
          authenticated: null
  })

  async function updateToken(token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  async function signIn(email: string, password: string) {
    try {
      const data = await authService.signIn(email, password)

      if (data) {
        updateToken(data.token)
        setAuthState({
            authenticated: true,
            token: data.token
        })
      }
    } catch (error) {
      throw error
    }
  }

  async function signUp({ name, email, birthday, password }: SignUpRequest) {
    try {
        await authService.signUp({ name, email, birthday, password })
    } catch (error) {
        throw error
    }
  }

  async function signOut() {
    try {
      setIsLoadingStoredToken(true)

      await authService.signOut()

      setAuthState({
        token: null,
        authenticated: null
      })
    } catch (error) {
      throw error
    } finally {
        setIsLoadingStoredToken(false)
    }
  }

  async function loadToken() {
    try {
      setIsLoadingStoredToken(true)

      const token = await authService.getAuthToken()

      if (token) {
        await updateToken(token)
        setAuthState({
            token,
            authenticated: true
        })
      }
    } catch (error) {
      throw error
    } finally {
        setIsLoadingStoredToken(false)
    }
  }

  useEffect(() => {
    loadToken()
  }, [])

  return (
    <AuthContext.Provider value={{
      signIn,
      signUp,
      signOut,
      isLoadingStoredToken,
      authState
    }}>
      {children}
    </AuthContext.Provider>
  )
}