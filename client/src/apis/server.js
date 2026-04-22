import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'
})

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers['access_token'] = token
  }
  return config
})

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default instance
