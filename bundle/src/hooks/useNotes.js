import { useEffect, useState } from "react"
import axios from 'axios'

export const useNotes = ({url}) => {
    const [notes, setNotes] = useState([])
    
    useEffect(() => {
        axios.get(url)
          .then(res => 
            setNotes(res))
          .catch(err => 
            console.error('Failed to fetch data:', err))
    }, [url])

    return notes
}