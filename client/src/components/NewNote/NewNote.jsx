import { useDispatch } from 'react-redux'
import { createNote } from '../../reducers/noteReducer'
import uuid4 from 'uuid4'

const NewNote = () => {
    const dispatch = useDispatch()

    // helper function
    const asObject = (content) => {
        return {
            content,
            important: false,
            id: uuid4()
        }
    }
    
    // handle submit method
    const handleSubmit = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        dispatch(createNote(content))
      } 

    return (
        <form onSubmit={handleSubmit}>
            <input name="note" />
            <button type="submit">add</button>
        </form>
    )
}

export default NewNote