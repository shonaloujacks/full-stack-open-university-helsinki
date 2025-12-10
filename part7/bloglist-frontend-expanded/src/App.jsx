import { useState, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import NotificationContext from './contexts/NotificationContext'
import { useUser } from './contexts/UserContext'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

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

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: blogService.fetchUsers,
    initialData: [],
  })

  const users = usersQuery.data

  console.log('THIS IS USERS', users)

  // Render
  if (blogsQuery.isLoading) return <div>Loading blogs...</div>
  if (blogsQuery.isError) return <div>Blog service not available</div>
  if (usersQuery.isLoading) return <div>Loading users...</div>
  if (usersQuery.isError) return <div>Users not availble</div>

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
    const blog = blogs.find((b) => b.id === id)
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
      <Notification />

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
          <p>{user.name} logged in</p>
          <LogoutForm handleLogout={handleLogout} />
          <h2>Blogs</h2>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                name={user.name}
                updateLikes={() => updateLikes(blog.id)}
                deleteBlog={() => deleteBlog(blog.id)}
              />
            ))}
          <Togglable buttonLabel="Create new blog">
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}
    </div>
  )
}

export default App
