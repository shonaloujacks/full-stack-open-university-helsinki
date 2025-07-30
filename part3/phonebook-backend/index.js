const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
let phonebook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());
app.use(express.static("dist"));
app.use(cors());

morgan.token("body", (request) => JSON.stringify(request.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (request, response) => {
  response.send("<h1>Phonebook</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(phonebook);
});

app.get("/info", (request, response) => {
  const info = `<p>Phonebook has info for ${phonebook.length} people</p>
    <p> ${new Date()}</p>`;
  response.send(info);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = phonebook.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  phonebook = phonebook.filter((person) => person.id !== id);
  response.status(204).end();
});

const generateID = () => {
  const maxID =
    phonebook.length > 0
      ? Math.max(...phonebook.map((person) => Number(person.id)))
      : 0;
  return String(maxID + 1);
};

app.post("/api/persons", (request, response) => {
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

  const phonebookEntry = {
    id: generateID(),
    name: body.name,
    number: body.number,
  };
  phonebook = phonebook.concat(phonebookEntry);
  response.json(phonebookEntry);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
