import { useNotes } from "./hooks/useNotes"

const Notes = () => {
    const url = 'https://notes2023.fly.dev/api/notes'
    const notes = useNotes(url)

    return (
        <div>
            {notes.map(item => (
                    <li key={item.id}> {item.content} </li>
                ))
            }
        </div>
    )
}

export default Notes