require('dotenv').config()
const express = require('express')
const { Blog, connectToMongoDB } = require('./mongo')

const app = express()
app.use(express.json())

connectToMongoDB();

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