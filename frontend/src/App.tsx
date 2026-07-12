import { useState } from 'react'
import './App.css'
import makeBasicRequest from './utils/makeBasicRequest'

function App() {
  const [requestStatus, setRequestStatus] = useState<string | null>(null)
  const [requestNumber, setRequestNumber] = useState<number>(1)
  const [requestTime, setRequestTime] = useState<number | null>(null)
  const [successfulRequests , setSuccessfulRequests ] = useState<number | null>(null)

  return (
    <>
      <div>
        <h1>FastLab</h1>
      </div>
      <div className="lab-card">
        <h3>Basic</h3>
        <label>
          Number of requests:
          <input type='number' onChange={(e) => {setRequestNumber(Number(e.target.value))}} />
        </label>
        <br></br><br></br>
        <button onClick={async () => {
          const requestResult = await makeBasicRequest(requestNumber || 1);
          setRequestStatus(requestResult.status);
          setSuccessfulRequests(requestResult.requestNum)
          setRequestTime(requestResult.elapsedTime);
        }}>Make Request</button>
        {requestStatus ? <p className={`request-status ${requestStatus}`}>Request Status: {requestStatus}</p> : null}
        {successfulRequests ? <p className={`request-status ${requestStatus}`}>Successful Requests: {successfulRequests}</p> : null}
        {requestTime !== null ? <p className={`request-status ${requestStatus}`}>Request Time: {requestTime.toFixed(2)} ms</p> : null}
      </div>
    </>
  )
}

export default App
