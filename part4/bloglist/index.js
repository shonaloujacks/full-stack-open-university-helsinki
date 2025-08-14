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
        response.status(500).json({ error: 'Something went wrong' })
    }
})

app.post('/api/blogs', async (request, response) => {
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
        response.status(201).json(savedBlog)
    }
    catch (error) {
        response.status(400).json({ error: 'Something went wrong' })
    }

})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})