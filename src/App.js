import "./App.css";
import { Search, MapPin, Wind, Droplet } from "react-feather";
import getWeather from "./api/api";
import { useState } from "react";
import dateFormat from "dateformat";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const getWeatherbyCity = async () => {
    const weatherData = await getWeather(city);
    setWeather(weatherData);
    setCity("");
  };

  const renderDate = () => {
    let now = new Date();
    return dateFormat(now, "dS mmmm yyyy, dddd, h:MM TT");
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="input-wrapper">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City or Location"
        />
        <button onClick={() => getWeatherbyCity()}>
          <Search></Search>
        </button>
      </div>

      {weather && weather.weather && (
        <div className="content">
          <div className="location d-flex">
            <MapPin></MapPin>
            <h2>
              {weather.name} <span>({weather.sys.country})</span>
            </h2>
          </div>
          <p className="datetext">{renderDate()}</p>

          <div className="weatherdesc d-flex flex-c">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
            <h3>{weather.weather[0].description}</h3>
          </div>

          <div className="tempstats d-flex flex-c">
            <h1>
              {weather.main.temp} <span>&deg;C</span>
            </h1>
            <h3>
              Feels Like {weather.main.feels_like} <span>&deg;C</span>
            </h3>
          </div>

          <div className="weather-info">
            <div className="humiditystats d-flex">
              <Droplet size={"32px"}></Droplet>
              <h3>
                {weather.main.humidity}% <br /> Humidity
              </h3>
            </div>

            <div className="windstats d-flex">
              <Wind size={"32px"}></Wind>
              <h3>
                {Math.round(weather.wind.speed * 3.6)} km/h
                <br /> Wind Speed
              </h3>
            </div>
          </div>
        </div>
      )}

      {!weather.weather && (
        <div className="content">
          <h4>No Data found !</h4>
        </div>
      )}

      {/* <p>{JSON.stringify(weather)}</p> */}
    </div>
  );
}

export default App;
