import WebApp from '@twa-dev/sdk'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/styles/global.css'
import App from './app/App.tsx'

try {
  WebApp.ready()
  WebApp.expand()
} catch {
  // Not in Telegram context
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
