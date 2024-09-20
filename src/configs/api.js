import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:5000' })

// intercept the request before sending to the server
api.interceptors.request.use(
    config => {
        const token= localStorage.getItem('token') || ''
        if(token) config.headers.Authorization = `Bearer ${token}`
        return config
    },
    Promise.reject
)

export default api