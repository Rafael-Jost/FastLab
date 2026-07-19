async function makeBasicRequest(requestNum: number = 1, simultaneous: boolean = false): Promise<{status: string, requestNum: number, elapsedTime: number, message: string | object}> {

  const elapsedTime = (startTime: number) => {
    const endTime = performance.now();
    return endTime - startTime;
  }

  const startTime = performance.now();

  let data: object | undefined;

  try {
    if (simultaneous) {
      const responses = await Promise.all(Array.from({ length: requestNum }, () => fetch('http://127.0.0.1:8000/basic')));
      for (const response of responses) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      }
      const results = await Promise.all(responses.map((response) => response.json()));
      data = results[results.length - 1];
    }
    else {
      for (let i = 0; i < requestNum; i++){
        const response = await fetch('http://127.0.0.1:8000/basic');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        data = await response.json();
        console.log('Request successful:', data);
      }
    }
  }
  catch (error) {
    const ErrorMessage = String(error);
    console.error('Request failed:', ErrorMessage);
    return {'status':'error', 'requestNum': requestNum, 'elapsedTime': elapsedTime(startTime), 'message': ErrorMessage};
  }

  return {'status':'success', 'requestNum': requestNum, 'elapsedTime': elapsedTime(startTime), 'message': data ?? {}}
};


export default makeBasicRequest;