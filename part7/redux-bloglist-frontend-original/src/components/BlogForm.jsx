import { useState } from 'react'

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
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title-input">Title:</label>
          <input
            id="title-input"
            data-testid="title-input"
            type="text"
            name="title"
            value={newTitle}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <label htmlFor="author-input">Author:</label>
          <input
            id="author-input"
            data-testid="author-input"
            type="text"
            name="author"
            value={newAuthor}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <label htmlFor="url-input">URL:</label>
          <input
            id="url-input"
            data-testid="url-input"
            type="text"
            name="url"
            value={newURL}
            onChange={handleBlogChange}
          />
        </div>
        <button data-testid="submit-button" type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
