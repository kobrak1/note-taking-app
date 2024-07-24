import { useState } from "react"

const NoteForm = () => {
    const [note, setNote] = useState(null)

    return (
        <div>
            <form>
                <input 
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add note..."
                />
            </form>
        </div>
    )
}