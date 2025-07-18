import { useState } from "react";

const Filter = (props) => {
  return (
    <p>
      Find countries:
      <input value={props.countrySearch} onChange={props.handleCountrySearch} />
    </p>
  );
};

const App = () => {
  const [countrySearch, setCountrySearch] = useState("");

  const handleCountrySearch = (event) => {
    console.log(event.target.value);
    setCountrySearch(event.target.value);
  };

  return (
    <div>
      <Filter
        countrySearch={countrySearch}
        setCountrySearch={setCountrySearch}
        handleCountrySearch={handleCountrySearch}
      />
    </div>
  );
};

export default App;
