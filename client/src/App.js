import React, { useEffect, useState, useRef } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Notification from "./components/Notification.jsx";
import noteService from "./services/services.js";
import loginService from "./services/login.js";
import Note from "./components/Note/Note.jsx";


function App() {
  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const inputRef = useRef(null);

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
  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    noteService
      .post(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
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
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  // handle note change
  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
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
    } catch (exception) {
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  };

  // handle user logout
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  // handle show important
  const notesToShow = showAll 
    ? notes
    : notes.filter(item => item.important)

  // login form component
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input 
        type="text"
        value={username}
        name="Username"
        onChange={e => setUsername(e.target.value)}/>
      </div>
      <div>
        password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={e => setPassword(e.target.value)}/>
      </div>
      <button type="submit">login</button>
    </form>
  )

  // note form
  const noteForm = () => (
    <form onSubmit={addNote}>
      <input 
        value={newNote} 
        onChange={handleNoteChange}
        inputref={inputRef} // to focus on the input field when the component rendered
      />
      <button type="submit">save</button>
    </form>
  )

  // if data is not fetched show nothing
  if (!notes) {
    return null;
  }

  return (
    <>
      <Header />
      <Notification message={errorMessage} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => handleLogout()}>logout</button>
          {noteForm()}
        </div>}
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
