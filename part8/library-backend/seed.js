const mongoose = require('mongoose')
const Author = require('./models/authors')
const Book = require('./models/books')

require('dotenv').config()

// Your hardcoded data
const authorsData = [
  { name: 'Robert Martin', born: 1952 },
  { name: 'Martin Fowler', born: 1963 },
  { name: 'Fyodor Dostoevsky', born: 1821 },
  { name: 'Joshua Kerievsky' }, // birthyear unknown
  { name: 'Sandi Metz' }, // birthyear unknown
]

const booksData = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'crime'],
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'revolution'],
  },
]

const MONGODB_URI = process.env.MONGODB_URI

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing data
    await Author.deleteMany({})
    await Book.deleteMany({})

    // Insert authors and store their _id for reference
    const authorDocs = {}
    for (let a of authorsData) {
      const authorDoc = new Author(a)
      await authorDoc.save()
      authorDocs[a.name] = authorDoc._id
    }

    // Insert books with author _id
    for (let b of booksData) {
      const bookDoc = new Book({
        title: b.title,
        published: b.published,
        genres: b.genres,
        author: authorDocs[b.author],
      })
      await bookDoc.save()
    }

    console.log('Seeding complete')
    mongoose.connection.close()
  } catch (err) {
    console.error(err)
  }
}

seed()
