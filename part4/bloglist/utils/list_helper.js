const dummy = (blogs) => {
  blogs = 1
  return blogs
}


const totalLikes = (blogPosts) => {
  if (blogPosts === 0) {
    return 0
  }
  else {
    return blogPosts.reduce((sum, blogPost) => sum + blogPost.likes, 0)
  }}

const favouriteBlog = (blogs) => {
  const mostLikes = blogs.reduce((favourite, blog) => {
    return favourite.likes > blog.likes ? favourite : blog
  })

  return mostLikes.title
}


module.exports = {
  dummy, totalLikes, favouriteBlog
}