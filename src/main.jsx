import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AWSWAFCaptchaModal from './AWSWAFCaptchaModal.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <AWSWAFCaptchaModal />
  </StrictMode>,
)
