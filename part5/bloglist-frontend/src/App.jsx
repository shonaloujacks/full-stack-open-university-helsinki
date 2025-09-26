import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login' 
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log(user)
    }
  }, [])

  const addBlog = async (event) => {
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL,
    }
    try {
      event.preventDefault();

      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog));
      setNewTitle('')
      setNewAuthor('')
      setNewURL('')
      setSuccessMessage(`Blog '${blogObject.title}' added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    } catch {
      setErrorMessage(`Blog '${blogObject.title}' could not be added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    if (name === 'title') {
      setNewTitle(value)
      console.log(value)
    }
    if (name === 'author') {
      setNewAuthor(value)
      console.log(value) 
    }
    if (name === 'url') {
      setNewURL(value)
      console.log(value)
    }
  }

  const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className="error">{message}</div>;
  };

  
  const SuccessNotification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className="success">{message}</div>;
  };


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const handleLogout = () => {

    window.localStorage.removeItem(
      'loggedNoteappUser'
    )
    setUser("") 
    console.log("Logged out user:", user)
  }

  const blogForm = () => (
    <Togglable 
      buttonLabel='Create'>
      <BlogForm
        addBlog={addBlog}
        newAuthor={newAuthor}
        newTitle={newTitle}
        newURL={newURL}
        handleBlogChange={handleBlogChange}
      />
    </Togglable>
  )

  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
    
      {!user && ( 
        <LoginForm 
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}/>
      )}
      {user && (
        <div>
          <p>{user.name} logged in </p> 
          <h2>Add blog</h2>
          {blogForm()}
          <h2>Blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}

          <LogoutForm 
            handleLogout={handleLogout}/>
        </div>
      )}
    </div>

  )
}
export default App