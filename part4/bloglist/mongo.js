require('dotenv').config()
const mongoose = require('mongoose')

const mongoUrl = process.env.MONGODB_URI
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoUrl)
        console.log('Connected to Mongo')
    } catch (error) {
        console.error('Error connecting to MongoDB@', error.message)
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