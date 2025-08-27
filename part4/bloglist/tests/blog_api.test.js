const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { initialBlogs, blogsInDB } = require('./test_helper')

const api = supertest(app)

describe('when there are initially some blogs saved', () => {
  beforeEach(async() => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  test('all blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    console.log(response.body)

    assert.strictEqual(response.body.length, 2)
  })

  test('verify id property name', async () => {
    await api
      .get('/api/blogs')
      .expect(response => {
        response.body.forEach(blog => {
          if (!blog.id) {
            throw new Error(`Missing id key in blog ${JSON.stringify(blog)}`)
          }
          if (blog._id) {
            throw new Error(`Old _id key in blog ${JSON.stringify(blog)}`)
          }
        })
      })
  })
})
describe('adding a new blog', () => { test('verify a new blog can be added', async () => {
  const newBlog = {
    title: 'Simple sushi recipe',
    author: 'Barney Desmazery',
    url: 'https://www.bbcgoodfood.com/recipes/simple-sushi',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(blog => blog.title)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  assert(contents.includes('Simple sushi recipe'))

})

test ('if missing likes property, value will default to 0', async () => {
  const newBlog = {
    title: 'Simple sushi recipe',
    author: 'Barney Desmazery',
    url: 'https://www.bbcgoodfood.com/recipes/simple-sushi',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const response = await api.get('/api/blogs')
  const contents = response.body
  const newBlogContent = contents[contents.length -1]
  assert.strictEqual(newBlogContent.likes, 0)
})

test ('if title property if missing, respond with 400', async () => {
  const newBlog = {
    author: 'Barney Desmazery',
    url: 'https://www.bbcgoodfood.com/recipes/simple-sushi',
    likes: 3,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test ('if url property if missing, respond with 400', async () => {
  const newBlog = {
    title: 'Simple sushi recipe',
    author: 'Barney Desmazery',
    likes: 3,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})
})

describe('deletion of a blog', () => {  test ('a blog can be deleted', async () => {
  beforeEach(async() => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })
  const allBlogs = await blogsInDB()
  const blogToDelete = allBlogs[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await Blog.find({})

  assert(!blogsAtEnd.includes(blogToDelete))

  assert.strictEqual(blogsAtEnd.length, allBlogs.length -1 )
})
})

describe('updating a blog', () => { test ('a blog can be updated', async () => {
  const updatedLikes = {
    likes: 6
  }
  const response = await api.get('/api/blogs')
  const blogs = response.body
  const blogToUpdate = blogs[0]
  const blogToUpdateId = blogToUpdate.id


  await api
    .put(`/api/blogs/${blogToUpdateId}`)
    .send(updatedLikes)

  const updatedBlog = await api.get(`/api/blogs/${blogToUpdateId}`)
  const contents = updatedBlog.body
  assert.strictEqual(contents.likes, 6)

})
})

after(async () => {
  await mongoose.connection.close()
})