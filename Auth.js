import { createContext, useEffect, useState, useContext } from "react"
import { getAuth } from "firebase/auth"
import Loading from "./components/Loading"
import Login from "./components/Login"
import nookies from "nookies"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const auth = getAuth()
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        console.log("no user")
        setCurrentUser(null)
        setIsLoading(false)
        nookies.set(undefined, "token", token, {})
        return
      }
      const token = await user.getIdToken()
      setCurrentUser(user)
      setIsLoading(false)
      nookies.set(undefined, "token", token, {})
    })
  }, [])
  if (isLoading) {
    return <Loading type="bubbles" color="yellowgreen" />
  }
  if (!currentUser) {
    return <Login />
  }
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
