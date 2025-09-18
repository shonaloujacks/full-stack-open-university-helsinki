import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login' 
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

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
    }
  }, [])

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL,
    }

    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog));
    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
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

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className="error">{message}</div>;
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
      setErrorMessage('wrong credentials')
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

  return (
    <div>
      <Notification message={errorMessage} />
    
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
          <h2>Blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          <h2>Add blog</h2>
          <BlogForm 
            addBlog={addBlog}
            newAuthor={newAuthor}
            newTitle={newTitle}
            newURL={newURL}
            handleBlogChange={handleBlogChange}
          />
          <LogoutForm 
            handleLogout={handleLogout}/>
        </div>
      )}
    </div>

  )
}
export default App