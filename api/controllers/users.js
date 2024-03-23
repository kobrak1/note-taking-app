﻿const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// get all users
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', { content: 1, important: 1 })
  response.status(200).json(users)
})

// get a specific user
usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('notes', { content: 1, important: 1 })
  response.status(200).json(user)
} )

// post a new user
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)

})

module.exports = usersRouter
