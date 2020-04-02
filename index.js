require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))


app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map((person) => person.toJSON()))
  })
})

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    res.send(
      `
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    `)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
  .then(person => {
    if (person) {
      res.json(person.toJSON())
    } else {
      res.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
      .then(savedPerson => savedPerson.toJSON())
      .then(savedAndFormatedPerson => {
        res.json(savedAndFormatedPerson)
      })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
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