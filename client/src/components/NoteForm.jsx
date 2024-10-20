import React from "react";
import { useFetchNotesQuery } from "../services/notesApi"
import { useDispatch } from "react-redux";

const NoteForm = () => {
  const { data, error, isLoading } = useFetchNotesQuery();

  // handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Notes:", data);
  };

  return (
    <div className="flex justify-center align-center bg-secondary min-h-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start align-start w-[500px] gap-3 p-3 text-slate-600"
      > 
      <div className="flex flex-col">
        <label htmlFor="title" className="text-tertiary font-bold">
            Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="e.g: Homework..."
          className="p-1 px-2 border rounded-md focus:outline-none"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="note" className="text-tertiary font-bold">Content</label>
        <textarea
          id="note"
          name="note"
          placeholder="Write something here..."
          className="p-1 px-2 h-[100px] rounded-md focus:outline-none"
        />
      </div>
        <button 
          type="submit"
          className="bg-btnPrimary hover:bg-btnSecondary active:bg-btnTertiary text-white p-1 rounded-md cursor-pointer"
        >
          Save note
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
