const express = require("express");
const cors = require("cors");
const app = express();

// middleware to parse JSON bodies
app.use(express.json());

// middleware to assure same origin policy
app.use(cors())

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

// GET ALL
app.get("/api/notes", (request, response) => {
  response.json(notes);
});

// GET SPECIFIED DATA
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

// DELETE METHOD
app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.filter((note) => note.id !== id);
  lengthArr = note.length;
  console.log("note deleted");

  if (note.length === notes.length) {
    response.send(`There is no item with id:${id}`);
  } else {
    response.json(note);
  }
  response.status(204).end();
});

// POST METHOD
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes/", (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  };

  notes = [...notes, note];
  response.json(note);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});