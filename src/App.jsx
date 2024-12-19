import './App.css'
import { useState } from 'react'
import axiosInstance from './axiosInstance'

function App() {
  const [count, setCount] = useState();
  const [showSeq, setShowSeq] = useState(false);
  const [totalCount, setTotalCount] = useState(1);

  const handSubmit = (e) => {
    e.preventDefault()
    let requestCount = 0;
    let stopRequest = false;

    const sendRequest = () => {
      if (requestCount >= count || stopRequest) return;

      axiosInstance
        .get('/whoami')
        .then(() => {
          console.log('Request succeeded');
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            setShowSeq(true);
            setTotalCount((prevTotal) => prevTotal + 1);
          }
          if (error.status === 405) {
            stopRequest = true;
          };
        })
        .finally(() => {
          requestCount++;
          if (requestCount < count && !stopRequest) {
            setTimeout(sendRequest, 1000);
          }
        });
    };

    sendRequest();
  }

  const allSequences = () => {
    if (totalCount <= 0) return null;
    return (
      <ul>
        {Array.from({ length: totalCount }, (_, i) => (
          i === 0 ? null : <li key={i}>{i}. Forbidden</li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <h2>Forbidden Sequence Form</h2>
      <div>
        <form onSubmit={handSubmit}>
          <div><input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.valueAsNumber)}
            min="1"
            max="1000"
            /></div>
          <button type='submit'>Submit sequences</button>
        </form>
      </div>
      <div>
        {showSeq && allSequences()}
      </div>
    </>
  )
}

export default App
