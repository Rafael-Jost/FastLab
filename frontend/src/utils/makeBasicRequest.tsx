async function makeBasicRequest() {
  try {
    const response = await fetch('http://127.0.0.1:8000/basic');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Request successful:', data);
    return 'success';
  }
  catch (error) {
  console.error('Request failed:', error);
  return 'error';
}         
};


export default makeBasicRequest;