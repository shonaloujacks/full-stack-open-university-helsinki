const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://wordsbyshonajackson:${password}@phonebook.rpvmrjp.mongodb.net/?retryWrites=true&w=majority&appName=Phonebook`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const phonebookEntrySchema = new mongoose.Schema({
  name: String,
  number: String,
});

const PhonebookEntry = mongoose.model("PhonebookEntry", phonebookEntrySchema);

if (process.argv.length > 3) {
  const person = new PhonebookEntry({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  PhonebookEntry.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
}
