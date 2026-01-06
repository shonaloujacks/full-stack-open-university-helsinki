import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import './index.css'
import { showNotification } from './reducers/notificationReducer'
import {
  initialiseBlogs,
  appendBlog,
  removeBlog,
  increaseLikes,
} from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const user = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initialiseBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const storedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(storedUser))
      blogService.setToken(storedUser.token)
      console.log(storedUser)
    }
  }, [])

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      dispatch(appendBlog(returnedBlog))
      dispatch(
        showNotification(`Blog '${blogObject.title}' added`, 'success', 5000)
      )
    } catch {
      dispatch(
        showNotification(
          `Blog '${blogObject.title}' could not be added`,
          'error',
          5000
        )
      )
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch {
      dispatch(showNotification('Wrong username or password', 'error', 5000))
    }
    console.log('logging in with', username, password)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    dispatch(clearUser())
    console.log('Logged out user:', user)
  }

  const blogForm = () => (
    <Togglable buttonLabel="Create new blog">
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const blogs = useSelector((state) => state.blogs)

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const handleBlogDelete = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id)
    if (window.confirm(`Delete ${blogToDelete.title}?`))
      try {
        dispatch(removeBlog(id))
        dispatch(
          initialiseBlogs(
            blogs.filter((blogToDelete) => blogToDelete.id !== id)
          )
        )
        dispatch(
          showNotification(`${blogToDelete.title} has been deleted`),
          'success',
          5000
        )
      } catch {
        dispatch(
          showNotification(`${blogToDelete.title} has already been removed`),
          'error',
          5000
        )
      }
  }

  const updateLikes = (id) => {
    const blogToUpdate = blogs.find((blog) => blog.id === id)
    try {
      dispatch(increaseLikes(id))
      dispatch(showNotification(`${blogToUpdate.title} liked`, 'success', 5000))
    } catch {
      dispatch(
        showNotification(
          `${blogToUpdate.title} could not be liked`,
          'error',
          5000
        )
      )
    }
  }

  return (
    <div>
      <Notification />

      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        />
      )}
      {user && (
        <div>
          <p>{user.name} logged in </p>
          <LogoutForm handleLogout={handleLogout} />
          <h2>Blogs</h2>
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              deleteBlog={handleBlogDelete}
              name={user.name}
              updateLikes={updateLikes}
            />
          ))}
          {blogForm()}
        </div>
      )}
    </div>
  )
}
export default App
