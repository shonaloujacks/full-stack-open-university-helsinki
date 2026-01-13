const { GraphQLError } = require('graphql')
const Book = require('./models/books')
const Author = require('./models/authors')
const { v1: uuid } = require('uuid')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const query = {}

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) return []

        query.author = author._id
      }

      if (args.genres && args.genres.length > 0) {
        query.genres = {
          $all: args.genres,
        }
      }

      return Book.find(query).populate('author')
    },

    allAuthors: async () => {
      console.log('allAuthors resolver called')
      try {
        const authors = await Author.find({})
        console.log('Authors found:', authors)
        return authors
      } catch (error) {
        console.error('Error in allAuthors resolver:', error)
        throw error
      }
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      author = await Author.findOne({ name: args.author })

      if (!author) {
        author = await Author.create({ name: args.author })
      }

      const bookExists = await Book.exists({ title: args.title })

      if (bookExists) {
        throw new GraphQLError(`Title must be unique: ${args.title}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
          },
        })
      }

      let book

      try {
        book = await Book.create({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: author._id,
        })
        await book.populate('author')
      } catch (error) {
        throw new GraphQLError(`Saving book failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        })
      }

      return book
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      if (!author.born) {
        try {
          author.born = args.setBornTo
          await author.save()
        } catch (error) {
          throw new GraphQLError(`Saving birth year failed: ${error.message}`, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.setBornTo,
              error,
            },
          })
        }
      }
      return author
    },
  },

  Author: {
    bookCount: async (root, args) => {
      return Book.countDocuments({ author: root._id })
    },
  },
}

module.exports = resolvers
