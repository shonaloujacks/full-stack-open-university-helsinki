const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("connected to MongoDB");
  } catch (error) {
    console.log("error connecting to MongoDB", error.message);
  }
};
console.log("URI: ", url);
connectToMongoDB();

const phonebookEntrySchema = new mongoose.Schema({
  name: String,
  number: String,
});

phonebookEntrySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("PhonebookEntry", phonebookEntrySchema);
