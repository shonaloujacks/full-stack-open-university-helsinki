const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(url)
    console.log('connected to MongoDB')
  } catch (error) {
    console.log('error connecting to MongoDB', error.message)
  }
}
console.log('URI: ', url)
connectToMongoDB()

const numberValidator = (numberEntry) => {
  console.log(phonebookEntrySchema)
  if (numberEntry.split('-').length !== 2) {
    throw new mongoose.Error.ValidationError('More than one hyphen')
  }
  const [numberPartOne, numberPartTwo] = numberEntry.split('-')
  if (isNaN(numberPartOne || numberPartTwo) === true) {
    throw new mongoose.Error.ValidationError(
      'Phone number contains non numerical characters'
    )
  }
  if (numberPartOne.length !== 2 && numberPartOne.length !== 3) {
    throw new mongoose.Error.ValidationError(
      'First part of phone number must include 2-3 digits'
    )
  }
}

const phonebookEntrySchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: numberValidator,
  },
})

phonebookEntrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('PhonebookEntry', phonebookEntrySchema)
