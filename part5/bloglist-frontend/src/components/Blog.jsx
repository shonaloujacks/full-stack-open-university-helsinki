import { useState } from "react"

const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)
  
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  
  return (
    <div>
      <div className='blogName' style={hideWhenVisible}><b>{blog.title}</b>
        <div>by {blog.author}</div> 
        <button onClick={toggleVisibility}>View</button>
      </div> 

      <div className='blogName' style={showWhenVisible}><b>{blog.title}</b>
        <div>by {blog.author}</div>
        <div>{blog.url}</div>
        <div>Likes: {blog.likes}</div>
        <button onClick={toggleVisibility}>Hide</button>
      </div>
    
    </div>  
  )}

export default Blog