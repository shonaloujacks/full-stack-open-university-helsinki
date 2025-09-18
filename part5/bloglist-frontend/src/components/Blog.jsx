const Blog = ({ blog }) => (
  <div>
    <div className='blogName'><b>{blog.title}</b></div> by {blog.author}
    
  </div>  
)

export default Blog