import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AcademicProvider } from './context/AcademicContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AcademicProvider>
        <App />
      </AcademicProvider>
    </BrowserRouter>
  </StrictMode>,
)