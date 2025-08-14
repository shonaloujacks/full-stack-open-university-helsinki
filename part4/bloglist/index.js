require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

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

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Blog = mongoose.model('Blog', blogSchema)

app.get('/', (request, response) => {
    response.send('Backend is running!')
})

app.get('/api/blogs', async (request, response) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    }
    catch (error) {
        response.status(500).json({ error: 'Something went wrong' })
    }
})

app.post('/api/blogs', async (request, response) => {
    const blog = new Blog(request.body)
    try {
        const newBlog = await blog.save()
        const allBlogs = await Blog.find({})
        console.log('Current blogs in database:', allBlogs)
        response.status(201).json(newBlog)
    }
    catch (error) {
        response.status(400).json({ error: 'Something went wrong' })
    }

})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})