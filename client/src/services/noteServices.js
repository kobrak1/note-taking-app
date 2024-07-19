import axios from 'axios'

// Access the auth and parse it to get the token
const getToken = () => {
  const auth = localStorage.getItem('auth')
  return auth ? JSON.parse(auth).token : ''
}

const api = axios.create({
    baseURL: 'http://localhost:3001/api/notes',
    timeout: 5000,
    headers: {'Authorization': `Bearer ${getToken()}`}
})

// Request interceptor for refreshing token logic
api.interceptors.request.use(
  config => {
    const token = getToken()
    if(token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor for global error handling
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response) {
      // handle different error status codes
      switch (err.response.status) {
        case 401:
          console.error('Unauthorized. Redirecting to login.')
          break
        case 403:
          console.error('Forbidden. You do not have permission to perform this action.')
          break
        case 404:
          console.error('Resource not found.')
          break
        case 500:
          console.log('Server error please try again later.')
          break
        default:
          console.error('An error occured:', err.response.status)
      }
    } else if (err.request) {
      console.error('No response from server. Please check your network.')
    } else {
      console.error('Error:', err.message)
    }
    return Promise.reject(err)
  }
)

export const fetchNotes = () => api.get('/')  // Fetch all notes
export const fetchNoteById = (id) => api.get(`/${id}`)  // Fetch a specific note
export const addNote = (content) => api.post('/', {...content, important: false})  // Create a new note
export const updateNote = (id, updates) => api.put(`/${id}`, updates)  // Update a specific note
export const deleteNote = (id) => api.delete(`/${id}`)  // Delete a specific note