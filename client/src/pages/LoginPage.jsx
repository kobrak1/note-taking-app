const LoginPage = () =>{
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const formData = new FormData(e.target)
    const resultObj = {
      email: formData.get("email"),
      password: formData.get("password")
    }

    console.log("Form Submitted:", resultObj)
  }

  return (
    <div className="flex justify-center items-center w-full p-2 bg-slate-300 rounded-md">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-start max-w-[300px] w-full p-2">
        <label htmlFor="email" className="ml-1 text-slate-500 font-bold">Email</label>
        <input 
          type="email" 
          name="email" 
          placeholder="user@example.com" 
          required
          className="w-full p-1 pl-2 mb-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <label htmlFor="password" className="ml-1 text-slate-500 font-bold">Password</label>
        <input 
          type="password" 
          name="password" 
          placeholder="password (min 8 characters)" 
          required
          className="w-full p-1 pl-2 mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button 
          type="submit" 
          className="flex justify-center items-center w-full p-1 text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md"
        >
          Login
        </button>
        {}
      </form>
    </div>
  )
}

export default LoginPage;