const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://wordsbyshonajackson:${password}@phonebook.rpvmrjp.mongodb.net/?retryWrites=true&w=majority&appName=Phonebook`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const phonebookEntrySchema = new mongoose.Schema({
  name: String,
  number: String,
});

const PhonebookEntry = mongoose.model("PhonebookEntry", phonebookEntrySchema);

const person = new PhonebookEntry({
  name: "Anna Michaels",
  number: "045-123456",
});

person.save().then((result) => {
  console.log(`added ${person.name} number ${person.number} to phonebook`);
  mongoose.connection.close();
});
