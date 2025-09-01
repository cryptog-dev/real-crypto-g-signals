import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext' // Import ThemeProvider
import './index.css'
import AppRouter from './AppRouter'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider> {/* Wrap with ThemeProvider */}
        <AppRouter />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)