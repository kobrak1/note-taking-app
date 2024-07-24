import React from "react"
import { useState } from "react"
import { Navigate } from "react-router-dom"
import { useLogin } from "../hooks/useAuth"

const Login = () =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const loginMutation = useLogin()

    // Check if the user already logged in, if true navigate to the homepage
    if (localStorage.getItem('auth')) {
        return <Navigate to={'/'}/>
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        loginMutation.mutate({ username, password })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                    required
                />
                <input 
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login