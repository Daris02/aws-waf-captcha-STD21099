import './App.css'
import { useState } from 'react'
import axiosInstance from './axiosInstance'

function App() {
  const [count, setCount] = useState();
  const [showSeq, setShowSeq] = useState(false);

  const handSubmit = (e) => {
    e.preventDefault()
    axiosInstance.get('/whoami', count)
      .then((res) => {
        console.log(res);
        setShowSeq(true);
      })
      .catch((error) => {
        if (error.status != 405 && count <= 100) {
          setShowSeq(false);
        }
      });
  }

  const allSequences = () => {
    if (count <= 0) return null;
    return (
      <ul>
        {Array.from({ length: count }, (_, i) => (
          <li key={i}>{i + 1}. Forbidden</li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <h2>Forbidden Sequence Form</h2>
      <form onSubmit={handSubmit}>
        <input type="number" onChange={(e) => setCount(e.target.value)} />
        <button type='submit'>Submit sequences</button>
      </form>
      <div>
        {showSeq && allSequences()}
      </div>
    </>
  )
}

export default App
