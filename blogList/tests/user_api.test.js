const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  for (let user of helper.initialUsers) {
    let userObject = new User(user)
    await userObject.save()
  }
})
describe('when there is initially some users saved', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(helper.initialUsers.length)
  })
})


test('verifies that the unique identifier property of the user posts is named id', async () => {
  const response = await api.get('/api/users')

  expect(response.body[0].id).toBeDefined()
})

describe('addition of a new user', () => {
  test('a valid user can be added', async () => {
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

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)

    const contents = usersAtEnd.map(n => n.username)
    expect(contents).toContain(newUser.username)
  })


  test('user without username is not added', async () => {
    const newUser = {
      name: "Testuser",
      password: "password",
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    expect(response.body.error).toBe('User validation failed: username: Path `username` is required.')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('user without password is not added', async () => {
    const newUser = {
      username: "test user",
      name: "Testuser",
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toBe('User validation failed: password: Path `password` is required.')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('user username is shoter than 3', async () => {
    const newUser = {
      username: 'tu',
      name: "Testuser",
      password: "password",
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    expect(response.body.error)
      .toBe(`User validation failed: username: Path \`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length (3).`)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('user password is shoter than 3', async () => {
    const newUser = {
      username: 'test user',
      name: "Testuser",
      password: "pw",
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    expect(response.body.error)
      .toBe(`User validation failed: password: Path \`password\` (\`${newUser.password}\`) is shorter than the minimum allowed length (3).`)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})