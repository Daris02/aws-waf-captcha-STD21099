import { useEffect } from 'react'
import './App.css'
import AWSWAFCaptchaModal from './AWSWAFCaptchaModal'
import axiosInstance from './axiosInstance'

function App() {
  useEffect(() => {
    axiosInstance
      .get(`/whoami`)
        .then((res) => res);
  });

  return (
    <>
      <button>Show my captcha</button>
      <AWSWAFCaptchaModal />
    </>
  )
}

export default App
