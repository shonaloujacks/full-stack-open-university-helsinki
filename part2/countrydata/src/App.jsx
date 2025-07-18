import { useEffect, useState } from "react";
import axios from "axios";

const Filter = (props) => {
  return (
    <p>
      Find countries:
      <input value={props.countrySearch} onChange={props.handleCountrySearch} />
    </p>
  );
};

const CountryList = (props) => {
  return (
    <ul>
      {props.filteredCountries.map((country) => (
        <li key={country.cca3}>{country.name.common}</li>
      ))}
    </ul>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countrySearch, setCountrySearch] = useState("");

  useEffect(() => {
    const getCountryData = async () => {
      const responseCountries = await axios.get(
        "https://studies.cs.helsinki.fi/restcountries/api/all"
      );
      setCountries(responseCountries.data);
    };
    getCountryData();
  }, []);

  const handleCountrySearch = (event) => {
    console.log(event.target.value);
    setCountrySearch(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countrySearch.toLowerCase())
  );

  return (
    <div>
      <Filter
        countrySearch={countrySearch}
        setCountrySearch={setCountrySearch}
        handleCountrySearch={handleCountrySearch}
      />
      <CountryList filteredCountries={filteredCountries} />
    </div>
  );
};

export default App;
