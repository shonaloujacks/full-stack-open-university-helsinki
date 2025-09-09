const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

const connectToMongoDB = async () => {
  try { await mongoose.connect(config.MONGODB_URI)
    logger.info('Connected to Mongo')
  } catch (error) {
    logger.error('Error connecting to MongoDB', error.message)
  }
}
connectToMongoDB()

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app