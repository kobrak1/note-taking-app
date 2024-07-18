import React, { useEffect, useState } from 'react'
import { fetchNotes } from './services/noteServices'

const App = () => {
 const [notes, setNotes] = useState([])
 
 useEffect(() => {
  fetchNotes()
    .then(notes => {
      setNotes(notes.data)
      console.log('Data fetched successfully')
    })
    .catch(err => console.error('Error fetching notes:', err))
 }, [])

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((item, index) => (
        <li key={index}> {item.content} </li>
      ))}
    </div>
  )
}

export default App
