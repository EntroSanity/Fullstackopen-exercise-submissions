const Basic = ({countryObject, weatherObject}) => {
    console.log('weatherObject:', weatherObject);
      // Extracting the icon code from the weather data
  const weatherIconCode = weatherObject && weatherObject.weather && weatherObject.weather[0].icon;
  // Constructing the URL for the weather icon
  const weatherIconURL = weatherIconCode ? `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png` : null;
    return (
            <div>
              <h1>{countryObject.name.common}</h1>
              <p>capital {countryObject.capital}</p>
              <p>area {countryObject.area}</p>
      
              <h2>languages:</h2>
              <ul>
                  {Object.entries(countryObject.languages).map(([index, language]) => 
                  <li key={index}>{language}</li>)}
              </ul>
      
              <img src={countryObject.flags.png} alt="flag" width="300" height="200" />

              <h2>Weather in {countryObject.capital}</h2>
              {weatherObject && weatherObject.main ? (
                <div>
                <p>temperature {(weatherObject.main.temp - 273.15).toFixed(2)} Celcius</p>
                {weatherIconURL && <img src={weatherIconURL} alt="weather icon" />}
                <p>wind: {weatherObject.wind.speed} m/s</p>
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
              </div>
              
    )
}

export default Basic;