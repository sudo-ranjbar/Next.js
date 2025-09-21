"use client"
import { me } from "@/actions/auth"
import { createContext, useEffect, useState } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const checkUserLogin = async () => {
            const userDataFromCooky = await me()

            if (userDataFromCooky?.error) {
                setUser(null)
            } else {
                setUser(userDataFromCooky.user)
            }
        }

        checkUserLogin()
    }, [])

    const loginContext = (user) => {
        setUser(user)
    }

    const logoutContext = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext