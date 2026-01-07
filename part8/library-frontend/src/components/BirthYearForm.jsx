import { useMutation, useQuery } from "@apollo/client/react";
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

  const { data, loading } = useQuery(ALL_AUTHORS);

  const authors = data?.allAuthors;

  if (loading) {
    return <div>Loading authors...</div>;
  }

  const authorsWithNoBirthYear = authors.filter(
    (author) => author.born === null,
  );

  console.log("Authors with no birth year", authorsWithNoBirthYear);

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
          <label>
            name{" "}
            <select
              name="name"
              value={name}
              onChange={(event) => {
                console.log("THIS IS E TARGET VALUE", event.target.value);
                setName(event.target.value);
              }}
            >
              <option value="" disabled>
                Select an author
              </option>
              {authorsWithNoBirthYear.map((author) => (
                <option key={author.id} value={author.name}>
                  {author.name}
                </option>
              ))}
            </select>
          </label>
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
