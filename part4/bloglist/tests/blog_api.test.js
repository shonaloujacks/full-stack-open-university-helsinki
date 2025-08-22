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

test.only('notes are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, 2)
})


after(async () => {
  await mongoose.connection.close()
})