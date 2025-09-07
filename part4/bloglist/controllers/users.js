const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {

  try {
    const { username, name, password } = request.body

    if (!password || password.length < 3 ) {
      return response.status(400).json ({ error: 'Password must be 3 or more characters' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})


module.exports = usersRouter