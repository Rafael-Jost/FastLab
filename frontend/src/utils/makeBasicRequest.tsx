async function makeBasicRequest(requestNum: number = 1, simultaneous: boolean = false): Promise<{status: string, requestNum: number, elapsedTime: number}> {

  const elapsedTime = (startTime: number) => {
    const endTime = performance.now();
    return endTime - startTime;
  }

  const startTime = performance.now();

  try {
    if (simultaneous) {
      await Promise.all(Array.from({ length: requestNum }, () => fetch('http://127.0.0.1:8000/basic')));
    } 
    else {
      for (let i = 0; i < requestNum; i++){
        const response = await fetch('http://127.0.0.1:8000/basic');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Request successful:', data);
      }
    }
  }
  catch (error) {
    console.error('Request failed:', error);
    return {'status':'error', 'requestNum': requestNum, 'elapsedTime': elapsedTime(startTime)};
  }

  return {'status':'success', 'requestNum': requestNum, 'elapsedTime': elapsedTime(startTime)}
};


export default makeBasicRequest;