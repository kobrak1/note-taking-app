const express = require("express");
const app = express();
app.use(express.json())

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
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.filter((note) => note.id !== id);
  lengthArr = note.length;
  console.log("note deleted");

  if (note.length === notes.length) {
    response.send(`<h2>There is no item with id:${id} </h2>`);
  } else {
    response.json(note);
  }
  response.status(204).end();
});

app.post("/api/notes/", (request, response) => {
  const note = request.body;
  console.log(note);
  response.json(note);
});

const PORT = 3005;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
