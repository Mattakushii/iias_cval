import React, { useEffect } from "react"
import { AuthProvider, useAuthContext } from "./core/auth-provider"
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
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