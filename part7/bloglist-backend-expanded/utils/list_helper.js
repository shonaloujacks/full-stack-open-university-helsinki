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
    console.log('THIS IS AUTHORFREQUENCY', authorFrequency)
    // counts number of each unique instance and turns into object that maps author name to count
    let maxAuthor = _.maxBy(Object.keys(authorFrequency), author => authorFrequency[author] )
    // Object.keys(authorFrequency) produces an array of authors, then applies a function to each element that counts its instances. Then the max value (ie most frequent author) is returned
    console.log('THIS IS MAXAUTHOR', maxAuthor)
    const maxCount = authorFrequency[maxAuthor]
    //looks up maxAuthor name in the authorFrequency object, which returns the value of that corresponding name key
    console.log('value:', maxAuthor, 'count:', maxCount)
    return { value: maxAuthor, count: maxCount }
  }}

const mostLikes = (blogs) => {
  const authorLikes = {}
  if (blogs === 0) {
    return 0
  }
  blogs.forEach((blog) => {
    authorLikes[blog.author] = (authorLikes[blog.author] ?? 0) + blog.likes
    console.log('THIS IS AUTHOR LIKES:', authorLikes)
  })

  let maxKey
  let highestLikes = 0
  for (const [key, value] of Object.entries(authorLikes)) {
    if (value > highestLikes) {
      highestLikes = value
      maxKey = key
    }
  }
  return { author: maxKey, likes: highestLikes }
}

// const myArr = [1,2,3,4]

// for (const num of myArr) console.log(num)

module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}