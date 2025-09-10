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

describe('when there are initially some blogs saved', () => {
  beforeEach(async() => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
    await User.deleteMany({})
  })

  test('all blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

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

describe('adding a new blog', () => {
  let loginResponse

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
    await User.deleteMany({})

    const newUser = {
      username: 'dobiesdobersoasdn',
      name: 'Dobie Shoberson',
      password: 'testpassword'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    loginResponse =
      await api
        .post('/api/login')
        .send ({ username: newUser.username, password: newUser.password })
        .expect(200)
  })

  test('verify a new blog can be added', async () => {
    const token = loginResponse.body.token

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

  test('if missing likes property, value will default to 0', async () => {
    const token = loginResponse.body.token

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

    const response = await api.get('/api/blogs')
    const contents = response.body
    const newBlogContent = contents[contents.length -1]
    assert.strictEqual(newBlogContent.likes, 0)
  })

  test ('if title property if missing, respond with 400', async () => {
    const token = loginResponse.body.token
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

  test('if url property if missing, respond with 400', async () => {
    const token = loginResponse.body.token
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

describe('deletion of a blog', () => {
  let loginResponse

  beforeEach(async() => {

    await Blog.deleteMany({})
    await User.deleteMany({})
    await Blog.insertMany(initialBlogs)

    const newUser = {
      username: 'dobiesdobersoasdn',
      name: 'Dobie Shoberson',
      password: 'testpassword'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    loginResponse =
      await api
        .post('/api/login')
        .send ({ username: newUser.username, password: newUser.password })
        .expect(200)

  })
  test ('a blog can be deleted', async () => {
    const token = loginResponse.body.token

    const newBlog = {
      title: 'Simple sushi',
      author: 'Barney Desmazery',
      url: 'https://www.bbcgoodfood.com/recipes/simple-sushi',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const allBlogs = await blogsInDB()
    const blogToDelete = allBlogs[allBlogs.length - 1]

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

  test ('a blog can be updated', async () => {
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

describe('creating new users', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'testUser', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
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

  test('creation fails with proper statuscode and message if username already taken', async () => {
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
  test('Creation fails with proper status code and message if username is less than 3 characters', async () => {
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

  test('Creation fails with proper status code and message if password is less than 3 characters', async () => {
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

  test('Creation fails with proper status code and message if password is missing', async () => {
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
  test('Creation fails with proper status code and message if username is missing', async () => {
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
describe('blog post api call sent without token', () => {

  beforeEach(async() => {

    await Blog.deleteMany({})
    await User.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })
})
test('Creation fails with proper status code and message if token is missing', async () => {
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

after(async () => {
  await mongoose.connection.close()
})