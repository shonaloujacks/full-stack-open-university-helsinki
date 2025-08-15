const _ = require('lodash')

const dummy = (blogs) => {
  blogs = 1
  return blogs
}


const totalLikes = (blogs) => {
  if (blogs === 0) {
    return 0
  }
  else {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }}

const favouriteBlog = (blogs) => {
  const mostLikes = blogs.reduce((favourite, blog) => {
    return favourite.likes > blog.likes ? favourite : blog
  })

  return mostLikes.title
}

const mostBlogs = (blogs) => {
  if (blogs === 0) {
    return 0
  }

  else {
    const authorList = blogs.map((blog) => blog.author)
    let authorFrequency = _.countBy(authorList)
    let maxAuthor = _.maxBy(Object.keys(authorFrequency),o => authorFrequency[o] )
    const maxCount = authorFrequency[maxAuthor]
    console.log('value:', maxAuthor, 'count:', maxCount)
    return { value: maxAuthor, count: maxCount }
  }}


module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs
}