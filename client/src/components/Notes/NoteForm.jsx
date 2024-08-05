import { useField } from '../../hooks/useField'
import { useCreateNote } from '../../hooks/useNotesData'
import Button from '../Button'

const NoteForm = () => {
    const createNote = useCreateNote()
    const content = useField('text')
    const important = useField('checkbox')

    const handleSubmit = (e) => {
        e.preventDefault()

        const noteData = new FormData()
        noteData.append('content', content.value)
        noteData.append('important', important.value)
        createNote.mutate(noteData)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input {...content} />
                <label>
                    Important
                    <input {...important} />
                </label>
                <Button type='submit'>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default NoteForm