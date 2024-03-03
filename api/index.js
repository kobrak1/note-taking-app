require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Note = require("./models/note");

const app = express(); // assign express() to the variable called 'app'

app.use(express.static("build")); // middleware to view static files on backend
app.use(express.json()); // middleware to parse JSON bodies
app.use(cors()); // middleware to assure same origin policy

// define main route handler
app.get("/", (request, response) => {
  response.send("<h1>Hello Mars!</h1>");
});

// GET ALL
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

// GET SPECIFIED DATA
app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then( note => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// DELETE METHOD
app.delete("/api/notes/:id", (request, response) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
});

// PUT METHOD
app.put("/api/notes/:id", (request, response) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important
  }

  Note.findByIdAndUpdate(request.params.id, note, {new: true})
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

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
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

// ERROR HANDLERS
const unknownEndPoint = (request, response) => {
  response.status(404).end()
}
// handler of requests with unknown endpoint
app.use(unknownEndPoint) 

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    response.status(404).send({error: 'malforatted id'})
  }

  next(error)
}
// handler of requests with unknown id
app.use(errorHandler) 



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
