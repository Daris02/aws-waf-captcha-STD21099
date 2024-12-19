import './App.css'
import { useState } from 'react'
import axiosInstance from './axiosInstance'

function App() {
  const [count, setCount] = useState();
  const [sequences, setSequences] = useState(0);
  const [showSeq, setShowSeq] = useState(false);

  const handSubmit = (e) => {
    e.preventDefault()
    console.log(count)
    axiosInstance.get('/whoami', count)
      .then((res) => {
        console.log(res);
        setShowSeq(false);
      })
      .catch((error) => {
        if (error.status != 405 && sequences <= 100) {
          setShowSeq(true);
        }
      });
      setShowSeq(true);
  }

  // const allSequences = () {
  //   const allSequences = document.createElement('div');
  //   for (let i = 1, i < sequences; i++) {

  //   }
  // }

  return (
    <>
      <h2>Forbidden Sequence Form</h2>
      <form onSubmit={handSubmit}>
        <input type="number" onChange={(e) => setCount(e.target.value)} />
        <button type='submit'>Submit sequences</button>
      </form>
      <div>
        {showSeq}
      </div>
    </>
  )
}

export default App
