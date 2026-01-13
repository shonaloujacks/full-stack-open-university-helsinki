const { GraphQLError } = require('graphql')
const Book = require('./models/books')
const Author = require('./models/authors')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const query = {}

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) {
          throw new GraphQLError(`Author ${args.author} does not exist`, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
            },
          })
        }

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
      try {
        const authors = await Author.find({})
        return authors
      } catch (error) {
        throw error
      }
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        if (args.author.length < 4) {
          throw new GraphQLError(
            `Author name ${args.author} must be at least 4 characters long`,
            {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author,
              },
            }
          )
        }
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

      if (args.title.length < 5) {
        throw new GraphQLError(
          `Book title ${args.title} must be at least 5 characters long`,
          {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
            },
          }
        )
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
        throw new GraphQLError(`Author ${args.name} does not exist`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
          },
        })
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
