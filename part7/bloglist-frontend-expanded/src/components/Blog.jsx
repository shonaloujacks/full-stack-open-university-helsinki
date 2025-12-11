import { useParams } from 'react-router-dom'

const Blog = ({ blogs, updateLikes, deleteBlog, user }) => {
  const { id } = useParams()

  const blog = blogs.find((blog) => blog.id === id)
  if (!blog) return <div>Blog not found</div>

  const isCurrentUser = () => {
    if (user?.name === blog?.user?.name) {
      return true
    }
  }

  return (
    <div className="blogName">
      <h2>{blog.title}</h2>
      <div>by {blog.author}</div>
      <div data-testid="blog-url">
        <a href={blog.url} target="_blank">
          {blog.url}
        </a>
      </div>

      <div data-testid="blog-likes">
        Likes: {blog.likes}
        <button
          data-testid="blog-likes-button"
          onClick={() => updateLikes(blog.id)}
        >
          Like
        </button>
        <div>Uploaded by {blog.user.name}</div>
      </div>

      {isCurrentUser() && (
        <button data-testid="blog-remove" onClick={() => deleteBlog(blog.id)}>
          Remove
        </button>
      )}
    </div>
  )
}

export default Blog
