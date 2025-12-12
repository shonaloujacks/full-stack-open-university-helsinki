import { useState } from 'react'
import { TextField, Button, Typography } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL,
    })

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

  return (
    <div>
      <Typography variant="h4" sx={{ mt: 3 }}>
        Create new
      </Typography>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label="Recipe title"
            id="title-input"
            data-testid="title-input"
            type="text"
            name="title"
            value={newTitle}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <TextField
            label="author"
            id="author-input"
            data-testid="author-input"
            type="text"
            name="author"
            value={newAuthor}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <TextField
            label="url"
            id="url-input"
            data-testid="url-input"
            type="text"
            name="url"
            value={newURL}
            onChange={handleBlogChange}
          />
        </div>
        <Button
          data-testid="submit-button"
          sx={{ mt: 1, mb: 1 }}
          type="submit"
          variant="outlined"
          color="success"
        >
          Create
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
