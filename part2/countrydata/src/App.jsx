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

const Country = ({ country, weather }) => {
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
      <h1>Weather in {country.name.common}</h1>
      <p>Temperature: {weather && weather.main ? weather.main.temp : "N/A"}</p>
      {weather && weather.weather && weather.weather[0] && (
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt={weather.weather[0].description}
        />
      )}
      <p>Wind: {weather && weather.wind ? weather.wind.speed : "N/A"}</p>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countrySearch, setCountrySearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getCountryData = async () => {
      const responseCountries = await axios.get(
        "https://studies.cs.helsinki.fi/restcountries/api/all"
      );
      setCountries(responseCountries.data);
    };
    getCountryData();
  }, []);

  useEffect(() => {
    const getWeatherData = async () => {
      if (!selectedCountry) return;
      const api_key = import.meta.env.VITE_WEATHER_API_KEY;
      const city = selectedCountry.capital[0];
      const code = selectedCountry.cca2;
      try {
        const responseWeather = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},${code}&appid=${api_key}`
        );
        console.log(responseWeather.data);
        setWeather(responseWeather.data);
      } catch (error) {
        console.log(error);
        setWeather(null);
      }
    };
    getWeatherData();
  }, [selectedCountry]);

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
        <Country country={selectedCountry} weather={weather} />
      ) : filteredCountries.length === 1 ? (
        <Country country={filteredCountries[0]} weather={weather} />
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
