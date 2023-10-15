import NotesAPI from "./notesAPI.js"

// NotesAPI.saveNote({
//     id:26549864,
//     title:"Hello World",
//     body:"What is going on in the earth?"
// });
NotesAPI.deleteNote("9035")

console.log(NotesAPI.getAllNotes());