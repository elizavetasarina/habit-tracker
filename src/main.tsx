import WebApp from '@twa-dev/sdk'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/styles/global.css'
import App from './app/App.tsx'

WebApp.ready()
WebApp.expand()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
