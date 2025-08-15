const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    }
    catch (error) {
        next(error)
    }
})

blogRouter.post('/', async (request, response, next) => {
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


module.exports = blogRouter