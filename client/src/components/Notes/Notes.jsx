import { useDeleteNote, useUpdateNote } from "../../hooks/useNotesData"
import withLoading from "../../hoc/withLoading"
import NoteItem from "./NoteItem"

const Notes = ({ data, isLoading, isError }) => {
  const updateItem = useUpdateNote()
  const deleteItem = useDeleteNote()

  const handleToggleImportant = (id, important) => {
    updateItem.mutate({ id, important })
  }

  const handleDelete = (id) => {
    deleteItem.mutate(id)
  }

  return (
    <div>
      {data.map((item) => (
        <NoteItem
          key={item.id}
          note={item}
          onToggleImportant={handleToggleImportant}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}

const NotesWithLoading = withLoading(Notes) // Wrap Notes component with withLoading HOC
export default NotesWithLoading