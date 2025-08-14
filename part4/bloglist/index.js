require('dotenv').config()
const express = require('express')
const Blog = require('./models/blog')

const app = express()
app.use(express.json())


app.get('/', (request, response) => {
    response.send('Backend is running!')
})

app.get('/api/blogs', async (request, response) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    }
    catch (error) {
        next(error)
    }
})

app.post('/api/blogs', async (request, response, next) => {
    const body = request.body
    try {

        if (!body.title || !body.url) {
            return response.status(400).json({ error: 'title or url missing' })
        }
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
        })
        const savedBlog = await blog.save()
        const allBlogs = await Blog.find({})
        console.log('Current blogs in database:', allBlogs)
        response.json(savedBlog)
    }
    catch (error) {
        next(error)
    }

})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    response.status(500).json({ error: 'Internal server error' })
}
app.use(errorHandler)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})