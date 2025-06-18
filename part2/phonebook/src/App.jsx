import { useState } from "react";

const Name = (props) => {
  return (
    <p>
      {props.person.name}: {props.person.number}
    </p>
  );
};

const Persons = (props) => {
  return (
    <div>
      {props.filteredPersons.map((person) => (
        <Name key={person.name} person={person} />
      ))}{" "}
    </div>
  );
};

const Filter = (props) => {
  return (
    <p>
      Search for a contact:{" "}
      <input value={props.filterSearch} onChange={props.handleFilterNames} />
    </p>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      {" "}
      {/*only triggerd when add button is clicked*/}
      Name:{" "}
      <input value={props.newName} onChange={props.handleNewPerson}></input>
      <div>
        <div>
          Number:{" "}
          <input value={props.newNumber} onChange={props.handleNewNumber} />
        </div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterSearch, setFilterSearch] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    const repeatEntry = persons.find((person) => person.name === newName);
    if (repeatEntry) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
    } else setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNewPerson = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterNames = (event) => {
    console.log(event.target.value);
    setFilterSearch(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterSearch.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterSearch={filterSearch}
        handleFilterNames={handleFilterNames}
      />

      <h2>Add a new contact: </h2>
      <PersonForm
        newName={newName}
        handleNewPerson={handleNewPerson}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        addName={addName}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
