import { useState, useEffect } from 'react';
import axios from 'axios';
import RenderResults from './components/RenderResults';

const App = () => {
  const [query, setQuery] = useState('');
  const [countryWeather, setCountryWeather] = useState({});
  const [countryObject, setCountryObject] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const fetchCountryInformation = () => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountryObject(response.data);
        fetchWeatherForCapitals(response.data);
      });
  };

  const fetchWeatherForCapitals = (countries) => {
    countries.forEach(country => {
      const apiKey = process.env.REACT_APP_MY_API_KEY;
      let capital;
      if (country.capital && Array.isArray(country.capital)) {
        capital = country.capital[0];
      } else if (typeof country.capital === 'string') {
        capital = country.capital;
      } else {
        console.warn(`Unexpected capital format for country ${country.name.common}`);
        return; // Skip this country
      }

      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital},${country.cca2.toLowerCase()}&appid=${apiKey}`)
        .then(weatherResponse => {
          setCountryWeather(prevState => ({
            ...prevState,
            [capital]: weatherResponse.data,
          }));
        })
        .catch(error => {
          console.error(`Error fetching weather for ${capital}:`, error);
        });
    });
  };

  useEffect(() => {
    fetchCountryInformation();
  }, []);
  
  const filteredCountryObjects = query
    ? countryObject.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))
    : [];

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
    setSelectedCountry(null);
  };

  return (
    <div>
      <div>
        Find countries: <input value={query} onChange={handleSearchChange} />
      </div>
      <RenderResults filteredCountries={filteredCountryObjects} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} countryWeather={countryWeather}/>
    </div>
  );
};

export default App;
