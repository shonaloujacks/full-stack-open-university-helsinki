import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

const BlogList = ({ blogs }) => {
  return (
    <div>
      <Typography variant="h3">Blogs</Typography>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Typography
            key={blog.id}
            variant="body1"
            component={Link}
            to={`/blogs/${blog.id}`}
            sx={{ display: 'block', mb: 1 }}
          >
            {blog.title} by {blog.author}
          </Typography>
        ))}
    </div>
  )
}

export default BlogList
