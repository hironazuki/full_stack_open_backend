const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

// beforeEach(async () => {
//   await User.deleteMany({})

//   const newUser = {
//     username: "test user",
//     name: "Testuser",
//     password: "password",
//   }

//   await api
//     .post('/api/users')
//     .send(newUser)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })
test('login test', async () => {
  await User.deleteMany({})

  const newUser = {
    username: "test user",
    name: "Testuser",
    password: "password",
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
  const response = await api
    .post('/api/login')
    .send({
      username: 'test user',
      password: 'password'
    })
    .expect(200)
  console.log(response.body.token)
})

afterAll(() => {
  mongoose.connection.close()
})