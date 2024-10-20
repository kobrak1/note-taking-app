import React from "react";
import NoteCard from "./NoteCard";
import { useFetchNotesQuery } from "../services/notesApi";

const NoteList = ({ username = "Unknown"}) => {
  const { data, error, isLoading } = useFetchNotesQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No notes available</p>;

  return (
    <div>
      <h1 className="font-semibold">{username}'s Notes</h1>
      <ul>
        {data?.map((item) => (
          <NoteCard 
            key={item.id}
            content={item.content}
            date={item.created_at}
          />
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
