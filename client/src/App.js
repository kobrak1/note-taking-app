import React, { useEffect, useRef, useState } from "react";
import noteService from "./services/services.js";
import loginService from "./services/login.js";
import { message } from "antd"
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Note from "./components/Note/Note.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import Togglable from "./components/Togglable/Togglable.jsx";
import NoteForm from "./components/NoteForm/NoteForm.jsx";


function App() {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const noteFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  // add new note
  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .post(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  // toggle importance of notes
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
        .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        console.error('Error:', error.message)
        message.error('Error while updating the note')
      })
  }

  // handle user login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user);
      setUsername("");
      setPassword("");
      message.success(`${user.name} logged in successfully`)
    } catch (error) {
      console.error('Error while logging in:', error.message)
      message.error('Incorrect username or password!')
    }
  };

  // handle user logout
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    message.success('logout successfull')
  }

  // handle show important
  const notesToShow = showAll 
    ? notes
    : notes.filter(item => item.important)

  // login form
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm 
            handleLogin={handleLogin} 
            username={username} 
            password={password} 
            handleUsernameChange={e => setUsername(e.target.value)}
            handlePasswordChange={e => setPassword(e.target.value)}
          />
        </div>
        <div style={showWhenVisible}>
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      {!user && loginForm()}
      {user && 
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => handleLogout()}>logout</button>
          <Togglable buttonLabel='new note' ref={noteFormRef} >
            <NoteForm createNote={addNote} />
          </Togglable>
        </div>
      }
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <Footer />
    </>
  );
}

export default App;
