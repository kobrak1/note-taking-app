const User = require('../models/user')
const Note = require('../models/note')
const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('---')
  next()
}

const unknownEndPoint = (request, response) => {
  response.status(404).end()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(404).send({ error: 'malforatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if ( error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected username to be unique' })
  } else if ( error.name === 'JsonWebTokenError' ) {
    return response.status(400).json({ error: 'token missing or invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    const token = authorization.substring(7)
    request.token = jwt.verify(token, process.env.SECRET) // decode the token got from request.body and assign it as 'request.token'

    if (!request.token.id) {
      return response.statusU(404).json({ error: 'token missing or invalid' })
    }

    next()
  } else next()
}

const userExtractor = async (request, response, next) => {
  request.user = await User.findById(request.token.id)

  next()
}

const noteExtractor = async (request, response, next) => {
  request.note = await Note.findById(request.params.id)

  next()
}

module.exports = {
  errorHandler,
  unknownEndPoint,
  requestLogger,
  tokenExtractor,
  userExtractor,
  noteExtractor
}
