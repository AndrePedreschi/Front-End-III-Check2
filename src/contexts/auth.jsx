import { useState } from "react"
import { createContext, useContext } from "react"

// Criação do Contexto
const AuthContext = createContext()

export function AuthProvider(props) {

  const authLocalStorage = localStorage.getItem('auth')


  const [auth, setAuth] = useState(authLocalStorage === null ? '' : authLocalStorage)

  // Função responsavel por salvar o token
  function saveToken(tokenReceived) {

    if (tokenReceived !== auth) {

      setAuth(tokenReceived)
      localStorage.setItem('auth', tokenReceived)

    }

  }

  return (

    <AuthContext.Provider value={{ auth, saveToken }}>
      {props.children}
    </AuthContext.Provider>

  )

}

export function useAuth() {

  const context = useContext(AuthContext)

  return context

}