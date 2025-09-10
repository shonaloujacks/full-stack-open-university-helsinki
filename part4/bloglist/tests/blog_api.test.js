const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { initialBlogs, blogsInDB, usersInDB } = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

describe('Blogs API', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await Blog.insertMany(initialBlogs)

  })

  describe('Retrieving blogs', () => {

    test('all blogs are returned as json', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.length, 2)
    })

    test('blogs have id proprty (not _id)', async () => {
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

  describe('Adding a blog', () => {
    let token
    beforeEach(async () => {

      const newUser = {
        username: 'shobieshoberson',
        name: 'Shobie Shoberson',
        password: 'testpassword'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)

      const loginResponse =
      await api
        .post('/api/login')
        .send ({ username: newUser.username, password: newUser.password })
        .expect(200)

      token = loginResponse.body.token
    })

    test('Suceeds with valid data and token', async () => {

      const newBlog = {
        title: 'Simple sushi recipe',
        author: 'Barney Desmazery',
        url: 'https://www.bbcgoodfood.com/recipes/simple-sushi',
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)


      const response = await api.get('/api/blogs')

      const contents = response.body.map(blog => blog.title)

      assert.strictEqual(response.body.length, initialBlogs.length + 1)
      assert(contents.includes('Simple sushi recipe'))

    })

    test('missing likes defaults to 0', async () => {

      const newBlog = {
        title: 'Simple sushi recipe',
        author: 'Barney Desmazery',
        url: 'https://www.bbcgoodfood.com/recipes/simple-sushi',
      }

      const postResponse =
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)


      const newBlogId = postResponse.body.id

      const getResponse = await api.get(`/api/blogs/${newBlogId}`)
      const blog = getResponse.body
      assert.strictEqual(blog.likes, 0)
    })

    test ('missing title returns 400', async () => {

      const newBlog = {
        author: 'Barney Desmazery',
        url: 'https://www.bbcgoodfood.com/recipes/simple-sushi',
        likes: 3,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
    })

    test('missing url returns 400', async () => {

      const newBlog = {
        title: 'Simple sushi recipe',
        author: 'Barney Desmazery',
        likes: 3,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
    })
  })

  describe('Deleting a blog', () => {
    let token
    let postResponse

    beforeEach(async() => {
      const newUser = {
        username: 'dobiesdobersoasdn',
        name: 'Dobie Shoberson',
        password: 'testpassword'
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)

      const loginResponse =
      await api
        .post('/api/login')
        .send ({ username: newUser.username, password: newUser.password })
        .expect(200)

      token = loginResponse.body.token

      const newBlog = {
        title: 'Simple sushi',
        author: 'Barney Desmazery',
        url: 'https://www.bbcgoodfood.com/recipes/simple-sushi',
        likes: 3,
      }

      postResponse =
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)

    })

    test ('succeeds with valid token', async () => {

      const allBlogs = await blogsInDB()
      const blogToDelete = postResponse.body
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await Blog.find({})

      assert(!blogsAtEnd.includes(blogToDelete))

      assert.strictEqual(blogsAtEnd.length, allBlogs.length -1 )
    })
  })

  describe('updating a blog', () => {

    test ('can update likes of blog', async () => {
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

  describe('Authorization', () => {
    test('Creation fails with 401 if token missing', async () => {
      const blogsAtStart = await blogsInDB()

      const newBlog = {
        title: 'Simple sushi',
        author: 'Barney Desmazery',
        url: 'https://www.bbcgoodfood.com/recipes/simple-sushi',
        likes: 3,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ')
        .send(newBlog)
        .expect(401)


      const blogsAtEnd = await blogsInDB()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })
  })
})

describe('Users API', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'testUser', passwordHash })
    await user.save()
  })

  test('creation succeeds with fresh username', async () => {
    const usersAtStart = await usersInDB()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDB()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode if username taken', async () => {
    const usersAtStart = await usersInDB()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result =
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDB()

    assert(result.body.error.includes('expected `username` to be unique'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('Creation fails if username less than 3 characters', async () => {
    const usersAtStart = await usersInDB()
    const newUser = {
      username: 'Ed',
      name: 'Ed',
      password: 'salainen',
    }

    const result =
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDB()

    assert(result.body.error.includes('`username` (`Ed`) is shorter than the minimum allowed length'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('Creation fails if password less than 3 characters', async () => {
    const usersAtStart = await usersInDB()
    const newUser = {
      username: 'Edward',
      name: 'Edward',
      password: 'it',
    }

    const result =
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDB()

    assert(result.body.error.includes('Password must be 3 or more characters'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('Creation fails if password missing', async () => {
    const usersAtStart = await usersInDB()
    const newUser = {
      username: 'Edward',
      name: 'Edward',
    }

    const result =
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDB()

    assert(result.body.error.includes('Password must be 3 or more characters'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
  test('Creation fails if username missing', async () => {
    const usersAtStart = await usersInDB()
    const newUser = {
      name: 'Edward',
      password: 'testpassword'
    }

    const result =
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDB()

    assert(result.body.error.includes('Path `username` is required'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})