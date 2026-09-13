import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AcademicProvider } from './context/AcademicContext'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AcademicProvider>
          <App />
        </AcademicProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)