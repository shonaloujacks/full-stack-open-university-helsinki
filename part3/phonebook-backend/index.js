require("dotenv").config();
const express = require("express");
const PhonebookEntry = require("./models/phonebookentry");
const app = express();
const morgan = require("morgan");

let phonebook = [];

app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (request) => JSON.stringify(request.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (request, response) => {
  response.send("<h1>Phonebook</h1>");
});

app.get("/api/persons", async (request, response) => {
  const getPersons = await PhonebookEntry.find({});
  response.json(getPersons);
});

app.get("/info", (request, response) => {
  const info = `<p>Phonebook has info for ${phonebook.length} people</p>
    <p> ${new Date()}</p>`;
  response.send(info);
});

app.get("/api/persons/:id", async (request, response) => {
  const person = await PhonebookEntry.findById(request.params.id);
  try {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

app.delete("/api/persons/:id", async (request, response) => {
  try {
    phonebook = await PhonebookEntry.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.post("/api/persons", async (request, response) => {
  const body = request.body;
  const duplicateName = phonebook.find((person) => person.name === body.name);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }
  if (duplicateName) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const phonebookEntry = new PhonebookEntry({
    name: body.name,
    number: body.number,
  });
  const savedEntry = await phonebookEntry.save();
  response.json(savedEntry);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
