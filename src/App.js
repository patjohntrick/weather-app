import React, { useState } from 'react';
import './App.css';

function App() {

  const [place, setPlace] = useState('');
  const [weather, setWeather] = useState({});

  const weatherapi = {
    key: "345b981f5ba3b41e6b059759215016d6",
    url: "https://api.openweathermap.org/data/2.5/"
  }

  const date = new Date();
  const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December'];
  const date_week = day[date.getDay()];
  const date_month = month[date.getMonth()];
  const date_day = date.getDate();
  const date_year = date.getFullYear();

  function handleChange(e){
    setPlace(e.target.value);
  }


  const search = e => {
    if(e.key === "Enter"){
      fetch(`${weatherapi.url}weather?q=${place}&units=metric&appid=${weatherapi.key}`)
      .then(j => j.json())
      .then(result => {
        setWeather(result);
        setPlace('');
        console.log(result);
      })
    }
  }

  return (
    <div className="App">
      <div className="app-container">

        <h1>Weather App</h1>

          <input type="text" placeholder="Search..." onChange={handleChange} value={place} onKeyPress={search}/>

        <div className="result">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>{date_week} {date_day} {date_month} {date_year}</p>
          <h3>{weather.main.temp}</h3>
          <div className="min-max">
            <h4>minimum</h4>
            <h4>maximum</h4>
          </div>
        </div>  
      </div>
    </div>
  );
}

export default App;
