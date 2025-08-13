const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://wordsbyshonajackson:${password}@phonebook.rpvmrjp.mongodb.net/?retryWrites=true&w=majority&appName=Phonebook`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const phonebookEntrySchema = new mongoose.Schema({
  name: String,
  number: String,
})

const PhonebookEntry = mongoose.model('PhonebookEntry', phonebookEntrySchema)

const addPerson = async () => {
  const person = new PhonebookEntry({
    name: name,
    number: number,
  })
  try {
    await person.save()
    console.log(`added ${person.name} number ${person.number} to phonebook`)
  } catch (error) {
    console.error(`Error saving ${person.name}`, error)
  } finally {
    mongoose.connection.close()
  }
}

const displayEntries = async () => {
  try {
    const result = await PhonebookEntry.find({})
    result.forEach((person) => {
      console.log(person.name, person.number)
    })
  } catch (error) {
    console.error('Error displaying entries', error)
  } finally {
    mongoose.connection.close()
  }
}

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

if (process.argv.length > 3) {
  addPerson()
} else {
  displayEntries()
}
