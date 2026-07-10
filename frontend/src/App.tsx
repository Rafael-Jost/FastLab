import { useState } from 'react'
import './App.css'
import makeBasicRequest from './utils/makeBasicRequest'

function App() {
  const [requestStatus, setRequestStatus] = useState<string | null>(null)

  return (
    <>
      <div>
        <h1>FastLab</h1>
      </div>
      <div className="lab-card">
        <h3>Basic</h3>
        <button onClick={async () => {
          const status = await makeBasicRequest();
          setRequestStatus(status);
        }}>Make Request</button>
        {requestStatus ? <p className={`request-status ${requestStatus}`}>Request Status: {requestStatus}</p> : null}
      </div>
    </>
  )
}

export default App
