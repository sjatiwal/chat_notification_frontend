export const BASEURL = 'https://live-backend-qix3.onrender.com/api/v1';
export const SOCKET_BASEURL = 'https://live-backend-qix3.onrender.com';

//common function for api integration
const fetchApi = async (url, method, body, headers) => {
  if (body) {
    // stringing the body
    body = typeof body === 'object' ? JSON.stringify(body) : body;
  }

  try {
    const response = await fetch(url, {method, body, headers});
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Fetch Error:', error.message);
    throw error;
  }
};

export default fetchApi;
