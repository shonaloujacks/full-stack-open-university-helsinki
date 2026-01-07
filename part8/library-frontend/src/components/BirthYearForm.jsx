import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_BIRTH_YEAR } from "../queries";

const BirthYearForm = () => {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const [editBirthYear] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onCompleted: (data) => {
      console.log("THIS IS NEW BIRTH YEAR DATA", data.editAuthor);
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    await editBirthYear({ variables: { name, setBornTo: Number(birthYear) } });

    setName("");
    setBirthYear("");
  };

  return (
    <div>
      <h2>Set birth year</h2>

      <form onSubmit={submit}>
        <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born{""}
          <input
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthYearForm;
