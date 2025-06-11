import { useState } from "react";

const Name = (props) => {
  return <p>{props.person.name}</p>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const personObject = { name: newName };

    setPersons(persons.concat(personObject));

    setNewName("");
  };

  const handleNewPerson = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        {" "}
        {/*only triggerd when add button is clicked*/}
        Name: <input value={newName} onChange={handleNewPerson}></input>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Name key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
