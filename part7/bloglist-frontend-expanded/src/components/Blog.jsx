import { useParams } from 'react-router-dom'
import { Typography, Button, Link as MuiLink } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const Blog = ({ blogs, updateLikes, deleteBlog, user }) => {
  const { id } = useParams()

  const blog = blogs.find((blog) => blog.id === id)
  if (!blog) return <Typography>Blog not found</Typography>

  const isCurrentUser = () => {
    if (user?.name === blog?.user?.name) {
      return true
    }
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
        {blog.title}
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        by {blog.author}
      </Typography>

      <Typography
        variant="body1"
        data-testid="blog-url"
        sx={{ mt: 2 }}
        gutterBottom
      >
        <MuiLink href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </MuiLink>
      </Typography>

      <Typography
        variant="body1"
        gutterBottom
        sx={{ mt: 2 }}
        data-testid="blog-likes"
      >
        Likes: {blog.likes}
        <Button
          variant="contained"
          size="small"
          data-testid="blog-likes-button"
          onClick={() => updateLikes(blog.id)}
          sx={{ ml: 2 }}
        >
          Like
        </Button>
      </Typography>

      <Typography variant="body1" sx={{ mt: 2 }} gutterBottom>
        Uploaded by {blog?.user?.name}
      </Typography>

      {isCurrentUser() && (
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          size="small"
          data-testid="blog-remove"
          onClick={() => deleteBlog(blog.id)}
          sx={{ mt: 2, mb: 3 }}
        >
          Delete
        </Button>
      )}
    </div>
  )
}

export default Blog
