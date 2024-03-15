const { test, after, beforeEach, } = require('node:test')
const assert = require('node:assert')
const Note = require('../models/note')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

// sample data to be saved to the test db
const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
]

// this code block will run before each test
beforeEach(async () => {
  await Note.deleteMany({})
  console.log('current data has been deleted')
  let noteObject = new Note(initialNotes[0])
  await noteObject.save()
  console.log('1. data has been saved to db')
  noteObject = new Note(initialNotes[1])
  await noteObject.save()
  console.log('2. data has been saved to db')
})

test.only('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, 2)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(e => e.content)
  // is the parameter truthy
  assert(contents.includes('HTML is easy'))
})

after(async () => {
  await mongoose.connection.close()
})
