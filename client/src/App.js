import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";
import noteService from "./services/services.js";
import loginService from "./services/login.js"
import Login from "./components/Login/Login.jsx";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error while fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ 
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log('error:', error.message);
    }
  }
  
  if(!data) {
    return null
  }

  return (
    <>
      <Login 
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin} />
      <Header />
      {isLoading ? <p>loading...</p> : <Content data={data} />}
      <Footer />
    </>
  );
}

export default App;
