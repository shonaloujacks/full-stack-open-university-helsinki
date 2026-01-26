const Book = require('./models/books')
const Author = require('./models/authors')

const batchBookCounts = async (authorIDs) => {
  console.log('batchBookCounts called with', authorIDs.length, 'authors')
  const results = await Book.aggregate([
    { $match: { author: { $in: authorIDs } } },
    {
      $group: {
        _id: '$author',
        bookCount: { $sum: 1 },
      },
    },
  ])
  return authorIDs.map((id) => {
    const found = results.find((result) => result._id.equals(id))
    return found ? found.bookCount : 0
  })
}

const batchAuthorInfo = async (authorIDs) => {
  console.log('batchAuthorInfo called with', authorIDs.length, 'authors')
  const results = await Author.find({ _id: { $in: authorIDs } })
  return authorIDs.map((id) => results.find((result) => result._id.equals(id)))
}

module.exports = { batchBookCounts, batchAuthorInfo }
