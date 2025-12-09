import { useState } from 'react'

const Blog = ({ blog, deleteBlog, name, updateLikes }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)
  const isCurrentUser = () => {
    if (name === blog?.user?.name) {
      return true
    }
  }

  return (
    <div data-testid="blog">
      <div className="blogName" data-testid="blog-name" style={hideWhenVisible}>
        <b>{blog.title}</b>
        <div data-testid="blog-author">by {blog.author}</div>
        <button data-testid="blog-view" onClick={toggleVisibility}>
          View
        </button>
      </div>

      <div className="blogName" style={showWhenVisible}>
        <b>{blog.title}</b>
        <button onClick={toggleVisibility}>Hide</button>
        <div>by {blog.author}</div>
        <div data-testid="blog-url">{blog.url}</div>

        <div data-testid="blog-likes">
          Likes: {blog.likes}
          <button
            data-testid="blog-likes-button"
            onClick={() => updateLikes(blog.id)}
          >
            Like
          </button>
        </div>

        {blog.user?.name && <div>Posted by: {blog.user.name}</div>}
        {isCurrentUser() && (
          <button data-testid="blog-remove" onClick={() => deleteBlog(blog.id)}>
            Remove
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
