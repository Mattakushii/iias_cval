import React from "react"
import { AuthProvider } from "./core/auth-provider"
import { BrowserRouter } from 'react-router-dom'
import { Root } from "./routes/root"

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </AuthProvider>
  )
}