import { useNotes } from "../../hooks/useNotesData"
import NotesWithLoading from "./Notes"

const NotesContainer = () => {
    const { data, isLoading, isError } = useNotes()

    return (
        <NotesWithLoading
            data={data || []}
            isLoading={isLoading}
            isError={isError}
        />
    )
}

export default NotesContainer