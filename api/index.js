const express = require("express");
const app = express();

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: false,
  },
  {
    content: "asdasd",
    important: true,
    id: 4,
  },
  {
    content: "burak",
    important: true,
    id: 5,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello Mars!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log(id, typeof id);
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.filter(note => note.id !== id)
    console.log('note deleted');

    response.status(204).end()
})

const PORT = 3005;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
