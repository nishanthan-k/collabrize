import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const timeout = import.meta.env.VITE_TIMEOUT;

const headers: Record<string, string> = {
  'content-type': 'application/json'
}

const jwtToken = localStorage.getItem('token');

if (jwtToken) {
  headers['Authorization'] = `Bearer ${jwtToken || 'Vanakam da mapla'}`
}

const axiosConfig = {
  baseURL,
  headers,
  timeout,
}

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.response.use(
  (resp) => resp,
  (error) => {
    console.log(error.response)
    const { status, data: { message } } = error.response;
    if (status === 401) {
      if (message.includes('JWT')) {
        console.log('JWTTTTTT')
        // document.location.href = '/login';
      }
    }
  }
)

export default axiosInstance;