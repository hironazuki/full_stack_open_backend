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
    // res.json(persons.map((person) => person.toJSON()))
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person.toJSON())
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})


app.post('/api/persons', (req, res) => {
  const body = req.body

  // if (body.name === undefined) {
  //   return res.status(400).json({ error: 'name or number missing' })
  // }
  if (!(body.name && body.number)) {
    return res.status(400).json({
      error: 'name and number is must'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
  })
  // const validateName = persons.some(person => person.name === body.name)

  // if (validateName) {
  //   return res.status(400).json({
  //     error: 'name must be unique'
  //   })
  // }

  // if (!(body.name && body.number)) {
  //   return res.status(400).json({
  //     error: 'name and number is must'
  //   })
  // }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})