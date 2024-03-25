const config = require('./utils/config')
const express = require('express')
const app = express() // assign express() to the variable called 'app'
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

// connect to mongoDB
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to mongodb:', error.message)
  })

app.use(cors()) // middleware to assure same origin policy
app.use(express.static('build')) // middleware to view static files on backend
app.use(express.json()) // middleware to parse JSON bodies
app.use(middleware.requestLogger) // middleware to log request properties

app.use('/api/notes', notesRouter) // attach '/api/notes' to notesRouter
app.use('/api/users', usersRouter) // attach '/api/users' to usersRouter
app.use('/api/login', loginRouter) // attach '/api/users' to loginRouter

app.use(middleware.unknownEndPoint) // handler of requests with unknown endpoint
app.use(middleware.errorHandler) // handler of requests with unknown id

module.exports = app
