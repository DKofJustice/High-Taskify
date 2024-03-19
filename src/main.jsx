import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext'
import { DarkModeProvider } from './context/DarkModeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <DarkModeProvider>
      <BrowserRouter>
        <React.StrictMode>
          <Toaster />
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </DarkModeProvider>
  </AuthProvider>,
)
