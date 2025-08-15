const dummy = (blogs) => {
  blogs = 1
  return blogs
}


const totalLikes = (blogPosts) => {
  return blogPosts.reduce((sum, blogPost) => sum + blogPost.likes, 0)
}


module.exports = {
  dummy, totalLikes
}