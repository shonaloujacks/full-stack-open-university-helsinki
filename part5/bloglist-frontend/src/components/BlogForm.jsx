const BlogForm = ({ addBlog, newTitle, newAuthor, newURL, handleBlogChange }) => {
  console.log('BlogForm rendered')
  return (
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor='title-input'>
          Title: 
        </label>
        <input 
          id='title-input'
          type='text'
          name='title'
          value={newTitle} 
          onChange={handleBlogChange} 
        />  
      </div>
      <div>
        <label htmlFor="author-input">
          Author:
        </label>
        <input 
          id='author-input'
          type='text'
          name='author'
          value={newAuthor} 
          onChange={handleBlogChange}
        />
      </div>
      <div>
        <label htmlFor="url-input">
          URL:
        </label>
        <input 
          id='url-input'
          type='text'
          name='url'
          value={newURL} 
          onChange={handleBlogChange} 
        />
      </div>
      <button type ="submit">Save</button>
    </form>
  )}


export default BlogForm