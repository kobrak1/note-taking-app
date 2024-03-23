const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

// GET ALL
notesRouter.get('/', async (request, response, next) => {
  try {
    const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
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
notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
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
notesRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = await User.findById(body.userId)
  console.log('This is the body:', body)
  console.log('This is the user:', user)

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
