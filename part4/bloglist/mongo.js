require('dotenv').config()
const mongoose = require('mongoose')

const { MONGODB_URI } = require('./utils/config')

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log(`Connected to MongoDB: ${MONGODB_URI}`)
  } catch (error) {
    console.error('Error connecting to MongoDB', error.message)
  }
}
connectToMongoDB()

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = { Blog, connectToMongoDB }