const notesRouter = require('express').Router()
const Note = require('../models/note')
const { userExtractor, noteExtractor } = require('../utils/middleware')

// Get all without auth
notesRouter.get('/fetch-notes', async (req, res) => {
  const notes = await Note.find({})
  res.status(200).json(notes)
})


// GET ALL
notesRouter.get('/', userExtractor, async (request, response, next) => {
  try {
    const userId = request.user.id
    const notes = await Note.find({ user: userId }).populate('user', { username: 1, name: 1 })
    response.status(200).json(notes)
  } catch (exception) {
    next(exception)
  }
})

// GET SPECIFIED DATA
notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id).populate('user', { username: 1, name: 1 })
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

// DELETE METHOD
notesRouter.delete('/:id', noteExtractor, async (request, response, next) => {
  try {
    const authorId = request.note.user.toString()
    const userId = request.token.id

    if (authorId === userId) {
      await Note.findByIdAndDelete(request.params.id)
      return response.status(204).end()
    }
    else response.status(401).send({ error: 'You are not allowed to delete someone else\'s note' })

  } catch (exception) {
    next(exception)
  }
})

// PUT METHOD
notesRouter.put('/:id', async (request, response, next) => {
  const { content, important } = request.body

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      request.params.id,
      { content, important },
      { new: true, runValidators: true, context: 'query' }
    )
    response.status(200).json(updatedNote)
  } catch (exception) {
    next(exception)
  }
})

// POST METHOD
notesRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body

  const user = request.user

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
    user: user.id
  })
  try {
    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    response.status(201).json(savedNote)
  } catch (exception) {
    next(exception)
  }
})

module.exports = notesRouter
