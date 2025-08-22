const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Courgette & lemon risotto',
    author: 'Chelsie Collins',
    url: 'https://www.bbcgoodfood.com/recipes/courgette-lemon-risotto',
    likes: 5
  },

  {
    title: 'Jerusalem artichoke fritters',
    author: 'Marie Mitchell',
    url: 'https://www.theguardian.com/food/2024/dec/02/marie-mitchells-jerusalem-artichoke-fritters-with-clementine-sauce-recipe',
    likes: 4
  }
]

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

test('verify a new blog can be added', async () => {
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

test.only ('if missing likes property, value will default to 0', async () => {
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

after(async () => {
  await mongoose.connection.close()
})