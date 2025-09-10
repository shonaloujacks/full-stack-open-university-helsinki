const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor, tokenExtractor } = require('../utils/middleware')


blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  }
  catch (error) {
    next(error)
  }
})


blogRouter.post('/', tokenExtractor, userExtractor, async (request, response, next) => {
  const body = request.body
  const user = await User.findById(request.user)
  try {

    if (!body.title || !body.url) {
      return response.status(400).json({ error: 'Title or url missing' })
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user

    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }
  catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response, next) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  try {

    if (blog.user.toString() !== user) {
      return response.status(403).json({ error: 'Invalid user' })
    }
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()

  } catch (error) {
    next(error) }
})


blogRouter.put('/:id', async (request, response, next) => {
  const likes = request.body.likes
  try {
    let blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).end()
    }
    blog.likes = likes
    const updatedBlog = await blog.save()
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

blogRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id
  try {
    const blog = await Blog.findById(id)
    if (blog) {
      response.json(blog)
    }
    response.status(404).end()
  } catch (error) {
    next(error)
  }
}
)

module.exports = blogRouter