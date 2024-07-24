import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { login } from "../services/authService"
import { message } from "antd"

// login hook
export const useLogin = () => {
    const navigate = useNavigate()
  
    return useMutation({
      mutationFn: (loginCreds) => login(loginCreds).data,
      onSuccess: (data) => {
          localStorage.setItem('auth', JSON.stringify(data))
          message.success('Login successful')
          navigate('/', { replace: true }) // redirect the protected route
      },
      onError: (error) => {
        console.error('Login error:', error)
        message.error('Login failed!')
      },
    })
}

// register hook
export const useRegister = () => {
    const navigate = useNavigate()
  
    return useMutation({
      mutationFn: (registerCreds) => register(registerCreds).data,
      onSuccess: (data) => {
          localStorage.setItem('auth', JSON.stringify(data))
          navigate('/', { replace: true })
          message.success('Registration successful')
      },
      onError: (error) => {
        console.error('Registration error:', error)
        message.error('User registration failed!')
      },
    })
}