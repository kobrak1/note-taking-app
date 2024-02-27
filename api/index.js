require('dotenv').config();
const express = require("express");
const cors = require("cors");
const Note = require('./models/note')

// assign express() to the variable called 'app'
const app = express();

// middleware to parse JSON bodies
app.use(express.json());

// middleware to assure same origin policy
app.use(cors());

// middleware to view static files on backend
app.use(express.static("build"));

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
  Note.find({}).then(notes => {
    response.json(notes);
  })
});

// GET SPECIFIED DATA
app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
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
app.post("/api/notes/", (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
