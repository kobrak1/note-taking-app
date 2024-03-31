const Login = ({ username, setUsername, password, setPassword, handleLogin }) => {  
    return (
        <>
            <form onSubmit={ handleLogin } className="login-form">
                <div>
                    Username
                    <input 
                    type="text"
                    value={ username }
                    name="Username"
                    onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    Password
                    <input 
                    type="text"
                    value={ password }
                    name="Password"
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login