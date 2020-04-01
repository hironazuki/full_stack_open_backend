const mongoose = require('mongoose')

// if (process.argv.length < 5) {
//   console.log('give password, name and number as argument')
//   process.exit(1)
// }

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-r300b.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length === 5 ) {
  person.save().then(result => {
    console.log(`added ${result['name']} number ${result['number']} to phonebook`)
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('電話帳：')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

