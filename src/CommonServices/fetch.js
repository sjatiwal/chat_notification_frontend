export const BASEURL = 'http://192.168.101.3:5500/api/v1';
export const SOCKET_BASEURL = 'http://192.168.101.3:5500';

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
    console.error('API Fetch Error:', error);
    throw error;
  }
};

export default fetchApi;
