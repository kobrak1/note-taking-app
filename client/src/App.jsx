import { useEffect } from "react"
import NewNote from "./components/NewNote/NewNote"
import Notes from "./components/Notes/Notes"
import VisibilityFilter from "./components/VisibilityFilter/VisibilityFilter"
import noteService from "./services/noteService"
import { initializeNotes, setNotes } from "./reducers/noteReducer"
import { useDispatch } from "react-redux"

const App = () => {
    const dispatch = useDispatch()
    // get all the data whenever the App component is rendered
    useEffect(() => {
        dispatch(initializeNotes())
    }, [])

    return (
        <div>
            <NewNote />
            <VisibilityFilter />
            <Notes />
        </div>
    )
}

export default App