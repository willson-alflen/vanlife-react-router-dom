import React from 'react'
import ReactDOM from 'react-dom/client'
import { UserProvider } from './UserContext'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
)
