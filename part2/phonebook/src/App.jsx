import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";
import "./index.css";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="confirm">{message}</div>;
};

const Error = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null;
  }

  return <div className="error">{errorMessage}</div>;
};

const Name = (props) => {
  return (
    <div>
      {props.person.name}: {props.person.number}
      <button
        onClick={() => {
          if (window.confirm(`"Delete ${props.person.name}?"`)) {
            props.handleDeleteEntry(props.person.id);
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
          key={person.id}
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
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
    };

    const repeatEntry = persons.find((person) => person.name === newName);
    const updatedNumberEntry = { ...repeatEntry, number: newNumber };

    try {
      if (repeatEntry) {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          const updatedPerson = await phonebookService.update(
            repeatEntry.id,
            updatedNumberEntry
          );

          setPersons(
            persons.map((person) =>
              person.id === repeatEntry.id ? updatedPerson : person
            )
          );

          setNewName("");
          setNewNumber("");
          setConfirmationMessage(`Updated ${newName}`);
          setTimeout(() => {
            setConfirmationMessage(null);
          }, 5000);
        } else {
          setNewName("");
          setNewNumber("");
        }
      } else {
        const newEntry = await phonebookService.create(personObject);
        setPersons(persons.concat(newEntry));
        setNewName("");
        setNewNumber("");
        setConfirmationMessage(`Added ${newName}`);
        setTimeout(() => {
          setConfirmationMessage(null);
        }, 5000);
      }
    } catch (error) {
      console.log(error.response.data.error);
      setErrorMessage();
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
    const person = persons.find((person) => person.id === id);
    try {
      await phonebookService.deleteEntry(id);
      setPersons(persons.filter((person) => person.id !== id));
    } catch {
      setErrorMessage(
        `${person.name} has already been removed from the server`
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  console.log("confirmationMessage", confirmationMessage);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={confirmationMessage} />
      <Error errorMessage={errorMessage} />
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
