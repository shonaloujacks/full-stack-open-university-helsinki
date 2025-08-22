const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')


blogRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  }
  catch (error) {
    logger.error(error)
  }
})

blogRouter.post('/', async (request, response) => {
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
    logger.error(error)
  }
})

blogRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    logger.error(error)
  }
})


module.exports = blogRouter