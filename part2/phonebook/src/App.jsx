import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";
import axios from "axios";

const Name = (props) => {
  return (
    <div>
      {props.person.name}: {props.person.number}
      <button
        onClick={() => {
          if (window.confirm("Do you want to delete this phonebook entry?")) {
            props.handleDeleteEntry(props.person.id);
          } else {
            null;
          }
        }}
      >
        delete
      </button>
    </div>
  );
};

const Persons = (props) => {
  return (
    <div>
      {props.filteredPersons.map((person) => (
        <Name
          key={person.name}
          person={person}
          handleDeleteEntry={props.handleDeleteEntry}
        />
      ))}
    </div>
  );
};

const Filter = (props) => {
  return (
    <p>
      Search for a contact:
      <input value={props.filterSearch} onChange={props.handleFilterNames} />
    </p>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      {/*only triggerd when add button is clicked*/}
      Name:
      <input value={props.newName} onChange={props.handleNewPerson}></input>
      <div>
        <div>
          Number:
          <input value={props.newNumber} onChange={props.handleNewNumber} />
        </div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterSearch, setFilterSearch] = useState("");

  useEffect(() => {
    const getAll = async () => {
      const allPhoneNumbers = await phonebookService.getAll();
      setPersons(allPhoneNumbers);
    };
    getAll();
  }, []);

  const addName = async (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };

    const repeatEntry = persons.find((person) => person.name === newName);
    if (repeatEntry) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
    } else {
      const newEntry = await phonebookService.create(personObject);
      setPersons(persons.concat(newEntry));
      setNewName("");
      setNewNumber("");
    }
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

  const handleDeleteEntry = async (id) => {
    await axios.delete(`${"http://localhost:3001/persons"}/${id}`);
    setPersons(persons.filter((person) => person.id !== id));
  };

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
      <Persons
        filteredPersons={filteredPersons}
        handleDeleteEntry={handleDeleteEntry}
      />
    </div>
  );
};

export default App;
