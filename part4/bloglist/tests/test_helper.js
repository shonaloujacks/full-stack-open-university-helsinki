const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Courgette & lemon risotto',
    author: 'Chelsie Collins',
    url: 'https://www.bbcgoodfood.com/recipes/courgette-lemon-risotto',
    likes: 5,
  },

  {
    title: 'Jerusalem artichoke fritters',
    author: 'Marie Mitchell',
    url: 'https://www.theguardian.com/food/2024/dec/02/marie-mitchells-jerusalem-artichoke-fritters-with-clementine-sauce-recipe',
    likes: 4,
  }
]




const blogsInDB = async () => {
  console.log('*****************')
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDB,
  usersInDB,
}