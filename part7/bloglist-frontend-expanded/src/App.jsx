import { useState, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Routes, Route, Link } from 'react-router-dom'
import NotificationContext from './contexts/NotificationContext'
import { useUser } from './contexts/UserContext'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UsersList from './components/UsersList'
import User from './components/User'

import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'

const App = () => {
  const { showNotification } = useContext(NotificationContext)
  const { user, login, logout } = useUser()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const queryClient = useQueryClient()

  // Fetch blogs
  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    initialData: [],
  })

  const blogs = blogsQuery.data
  console.log('THIS IS BLOGS', blogs)

  // Render
  if (blogsQuery.isLoading) return <div>Loading blogs...</div>
  if (blogsQuery.isError) return <div>Blog service not available</div>

  // Mutations
  const addBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => queryClient.invalidateQueries(['blogs']),
  })

  const updateLikesMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: () => queryClient.invalidateQueries(['blogs']),
  })

  const deleteBlogMutation = useMutation({
    mutationFn: (id) => blogService.deleteBlog(id),
    onSuccess: () => queryClient.invalidateQueries(['blogs']),
  })

  // Handlers
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userData = await loginService.login({ username, password })
      login(userData)
      setUsername('')
      setPassword('')
      showNotification(`Welcome ${userData.name}`, 'success')
    } catch {
      showNotification('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    logout()
    showNotification('Logged out', 'success')
  }

  const addBlog = async (newBlog) => {
    try {
      await addBlogMutation.mutateAsync(newBlog)
      showNotification(`Blog '${newBlog.title}' added`, 'success')
    } catch {
      showNotification(`Failed to add '${newBlog.title}'`, 'error')
    }
  }

  const updateLikes = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    if (!blog) return

    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      await updateLikesMutation.mutateAsync({ id, updatedBlog })
      showNotification(`Liked '${blog.title}'`, 'success')
    } catch {
      showNotification(`Could not like '${blog.title}'`, 'error')
    }
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    if (!blog) return

    if (!window.confirm(`Delete blog '${blog.title}' by ${blog.author}?`))
      return

    try {
      await deleteBlogMutation.mutateAsync(id)
      showNotification(`Deleted '${blog.title}'`, 'success')
    } catch {
      showNotification(`Could not delete '${blog.title}'`, 'error')
    }
  }

  const padding = {
    padding: 5,
  }

  return (
    <div>
      <h1>Blogs</h1>
      {user ? (
        <em>{user.name} logged in</em>
      ) : (
        <Link style={padding} to="/login">
          Login
        </Link>
      )}
      <LogoutForm handleLogout={handleLogout} />
      <div>
        <Notification />
        <Link style={padding} to="/users">
          Users
        </Link>
        <Link style={padding} to="/">
          Blogs
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<BlogList blogs={blogs} />}></Route>
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<User />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blogs={blogs}
              updateLikes={updateLikes}
              deleteBlog={deleteBlog}
              user={user}
            />
          }
        />
      </Routes>

      {!user ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <Togglable buttonLabel="Create new blog">
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}
    </div>
  )
}

export default App
