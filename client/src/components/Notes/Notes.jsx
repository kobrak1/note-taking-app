import { useDeleteNote, useNotes, useUpdateNote } from "../../hooks/useNotesData"
import { CircularProgress } from '@mui/material'
import NoteItem from "./NoteItem"
import ErrorMessage from './ErrorMessage'

const Notes = () => {
  const { data = [], isLoading, isError } = useNotes()
  const updateItem = useUpdateNote()
  const deleteItem = useDeleteNote()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ErrorMessage />
      </div>
    )
  }

  const handleToggleImportant = (id, important) => {
    updateItem.mutate({ id, important })
  }

  const handleDelete = (id) => {
    deleteItem.mutate(id)
  }

  return (
    <div className="flex flex-col items-center mx-auto">
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

export default Notes
