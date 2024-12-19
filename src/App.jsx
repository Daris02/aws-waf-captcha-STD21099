import './App.css'
import { useState } from 'react'
import axiosInstance from './axiosInstance'
import AWSWAFCaptchaModal from './AWSWAFCaptchaModal'

function App() {
  const [count, setCount] = useState();

  const handSubmit = (e) => {
    e.preventDefault()
    console.log(count)
    axiosInstance.get('/whoami', count)
      .then((res) => console.log(res))
  }

  return (
    <>
      <h2>Forbidden Sequence Form</h2>
      <form onSubmit={handSubmit}>
        <input type="number" onChange={(e) => setCount(e.target.value)} />
        <button type='submit'>Submit sequences</button>
      </form>
      <AWSWAFCaptchaModal />
    </>
  )
}

export default App
