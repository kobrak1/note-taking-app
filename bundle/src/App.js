import React, { useState, useEffect } from 'react'
import { useNotes } from './hooks/useNotes'

const App = () => {
  const [counter, setCounter] = useState(0)
  const [values, setValues] = useState([])
  const notes = useNotes(BACKEND_URL)

  const handleClick = () => {
    setCounter(counter + 1)
    setValues(values.concat(counter))
  }
  console.log('notes', notes)
  console.log('BACK URL:', BACKEND_URL)

  return (
    <div className="container">
      hello webpack {counter} clicks
      <button onClick={handleClick}>press</button>

      <div>{notes.length} notes on server {BACKEND_URL}</div>
    </div>
  )
}

export default App