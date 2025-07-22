import { useEffect, useState } from "react";
import axios from "axios";

const Filter = ({ countrySearch, handleCountrySearch }) => {
  return (
    <p>
      Find countries:
      <input value={countrySearch} onChange={handleCountrySearch} />
    </p>
  );
};

const CountryList = ({ filteredCountries, setSelectedCountry }) => {
  return (
    <ul>
      {filteredCountries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => setSelectedCountry(country)}> show </button>
        </li>
      ))}
    </ul>
  );
};

const Country = ({ country }) => {
  console.log(country);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h1>Languages</h1>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countrySearch, setCountrySearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

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
    setSelectedCountry(null);
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
      {countrySearch === "" ? null : filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : selectedCountry ? (
        <Country country={selectedCountry} />
      ) : filteredCountries.length === 1 ? (
        <Country country={filteredCountries[0]} />
      ) : (
        <CountryList
          filteredCountries={filteredCountries}
          setSelectedCountry={setSelectedCountry}
        />
      )}
    </div>
  );
};

export default App;
