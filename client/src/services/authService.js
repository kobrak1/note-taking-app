import axios from "axios"

// axios instance with default configuration
const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    timeout: 5000
})

// Response interceptor that stores the response from login or register controllers
api.interceptors.response.api(
    res => {
        const auth = res.data
        localStorage.setItem('auth', JSON.stringify(auth))
        return res
    },
    err => {
        return Promise.reject(err)
    }
)

export const login = (loginCreds) => api.post('/login', loginCreds)
export const register = (registerCreds) => api.post('/register', registerCreds)