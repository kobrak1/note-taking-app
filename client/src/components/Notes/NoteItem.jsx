import { DeleteOutlineSharp, GradeOutlined, Grade } from "@mui/icons-material"

const NoteItem = ({ note, onToggleImportant, onDelete }) => {
  return (
    <div className="flex justify-between min-h-minH w-1/2 p-2 m-2 border border-slate-400 bg-slate-200">
      <div className="w-2/3 flex flex-col justify-between">
        <div className="text-slate-600">{note.content}</div>
        <div className="flex-grow" /> {/* Spacer to push the date to the bottom */}
        <div className="text-slate-400 text-sm">{note.created_at}</div>
      </div>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => onToggleImportant(note.id, !note.important)}
      >
        {note.important
          ? <Grade className="text-yellow-500" />
          : <GradeOutlined className="text-slate-500" />
        }
      </div>
      <div className="flex items-center pr-2">
        <DeleteOutlineSharp
          className="text-slate-400"
          onClick={() => onDelete(note.id)}
        />
      </div>
    </div>
  )
}

export default NoteItem
