import useLabRequest from '../hooks/useLabRequest';
import makeBasicRequest from '../utils/makeBasicRequest';
import Spinner from './Spinner';
import { useState } from 'react';

function BasicRequestCard() {
    const {labRequestRun, result, isLoading} = useLabRequest(makeBasicRequest);
    const [requestNumber, setRequestNumber] = useState<number>(1)
    const [simultaneousRequests, setSimultaneousRequests] = useState<boolean>(false)

    return (
        <div className="lab-card">
            <div className="lab-card-col">
                <h3>Basic</h3>
                <div className="form-fields">
                <label>
                    Number of requests:
                    <input type='number' onChange={(e) => {setRequestNumber(Number(e.target.value))}} />
                </label>
                <label>
                    Simultaneous requests:
                    <input type='checkbox' onChange={(e) => {setSimultaneousRequests(e.target.checked)}} />
                </label>
                </div>
                <span className="request-button-container">
                    <button className="request-button" onClick={async () => {
                        await labRequestRun(requestNumber || 1, simultaneousRequests);
                    }}>Make Request</button> 
                    {isLoading ? <Spinner /> : null}
                </span>
                {result ? <p className={`request-status ${result.status}`}>Request Status: {result.status}</p> : null}
                {result ? <p className={`request-status ${result.status}`}>Successful Requests: {result.requestNum}</p> : null}
                {result ? <p className={`request-status ${result.status}`}>Request Time: {result.elapsedTime.toFixed(2)} ms</p> : null}
            </div>
            <div className="lab-card-col">
                <pre className="code-block">
                    <code>{result ? JSON.stringify(result.message, null, 2) : '// response will appear here'}</code>
                </pre>
            </div>
        </div>
    )
}


export default BasicRequestCard