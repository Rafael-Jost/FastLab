async function makeBasicRequest(requestNum: number = 1) {

  for (let i = 0; i < requestNum; i++){
    try {
      const response = await fetch('http://127.0.0.1:8000/basic');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Request successful:', data);
    }
    catch (error) {
      console.error('Request failed:', error);
      return {'status':'error', 'requestNum': i};
    }
  } 
  
  return {'status':'success', 'requestNum': requestNum}
};


export default makeBasicRequest;