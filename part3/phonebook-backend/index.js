require('dotenv').config()
const express = require('express')
const PhonebookEntry = require('./models/phonebookentry')
const app = express()
const morgan = require('morgan')
let phonebook = []

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (request) => JSON.stringify(request.body))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/', (request, response) => {
  response.send('<h1>Phonebook</h1>')
})

app.get('/api/persons', async (request, response) => {
  const getPersons = await PhonebookEntry.find({})
  response.json(getPersons)
})

app.get('/info', async (request, response, next) => {
  try {
    phonebook = await PhonebookEntry.find({})
    const info = `<p>Phonebook has info for ${phonebook.length} people</p>
    <p> ${new Date()}</p>`
    response.send(info)
  } catch (error) {
    next(error)
  }
})

app.get('/api/persons/:id', async (request, response, next) => {
  const person = await PhonebookEntry.findById(request.params.id)
  try {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id', async (request, response, next) => {
  try {
    phonebook = await PhonebookEntry.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.put('/api/persons/:id', async (request, response, next) => {
  const newNumber = request.body.number
  try {
    const updatedPerson = await PhonebookEntry.findByIdAndUpdate(
      request.params.id,
      { number: newNumber },
      { new: true, runValidators: true }
    )
    response.json(updatedPerson)
  } catch (error) {
    next(error)
  }
})

app.post('/api/persons', async (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing',
    })
  }

  const phonebookEntry = new PhonebookEntry({
    name: body.name,
    number: body.number,
  })

  try {
    const savedEntry = await phonebookEntry.save()
    response.json(savedEntry)
  } catch (error) {
    next(error)
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.name, error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
