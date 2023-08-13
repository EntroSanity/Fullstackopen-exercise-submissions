import React from 'react';
import Basic from './Basic';
import Country from './Country';


const RenderResults = ({filteredCountries, selectedCountry, setSelectedCountry, countryWeather}) => {

    console.log("Country Weather", countryWeather)
    const countryNames = filteredCountries.map(country => country.name).map(country => country.common);
    const weatherObjectForSelectedCountry = selectedCountry ? countryWeather[selectedCountry.capital[0]] : null;


    if (countryNames.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } 

    else if (countryNames.length > 1) {
      return (
        <div>
          {filteredCountries.map((country,index) => (
              <Country countryObject={country} key={index} setSelectedCountry={setSelectedCountry}/>
          ))}
          {selectedCountry && <Basic countryObject={selectedCountry} weatherObject={weatherObjectForSelectedCountry}/>}
        </div>
      );
    } 

    else if (filteredCountries.length === 1) {
      const singleCountryWeatherObject = countryWeather[filteredCountries[0].capital[0]];
      return <Basic countryObject={filteredCountries[0]} weatherObject={singleCountryWeatherObject} />;
    }
    
    return null;
};


export default RenderResults;