const BlogForm = ({ addBlog, newTitle, newAuthor, newURL, handleBlogChange }) => {
  console.log('BlogForm rendered')
  return (
    <form onSubmit={addBlog}>
      <div>
        <label>
                    Title: 
          <input 
            type='text'
            name='title'
            value={newTitle} 
            onChange={handleBlogChange} 
          />  
        </label>
      </div>
      <div>
        <label>
                    Author:
          <input 
            type='text'
            name='author'
            value={newAuthor} 
            onChange={handleBlogChange}
          />

        </label>
      </div>
      <div>
        <label>
                    URL:
          <input 
            type='text'
            name='url'
            value={newURL} 
            onChange={handleBlogChange} 
          />

        </label>
      </div>
      <button type ="submit">Save</button>
    </form>
  )}


export default BlogForm