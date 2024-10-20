const config = require('./utils/config')
const express = require('express')
const app = express() // assign express() to the variable called 'app'
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')
const loginRouter = require('./controllers/login')

// connect to mongoDB
mongoose.set('strictQuery', false)
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
app.use(middleware.tokenExtractor) // middleware to set the token to 'request.token'

app.use('/api/notes', notesRouter) // attach '/api/notes' to notesRouter
app.use('/api/users', usersRouter) // attach '/api/users' to usersRouter
app.use('/api/login', loginRouter) // attach '/api/users' to loginRouter

// apply testing route if the NODE_ENV=test
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndPoint) // handler of requests with unknown endpoint
app.use(middleware.errorHandler) // handler of requests with unknown id

module.exports = app
