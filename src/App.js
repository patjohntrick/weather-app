import React, { useState } from 'react';
import './App.css';
import Normal from './img/normal.jpg';
import Cold from './img/cold.jpg';
import Hot from './img/hot.jpg';

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

  async function searchApi(e){
    e.preventDefault();

    const api = await fetch(`${weatherapi.url}weather?q=${place}&units=metric&appid=${weatherapi.key}`);
    let data;
    if(api.status === 404){
      setPlace('');
      alert("Place not found.");
    }
    else{
      data = await api.json()
      setWeather(data)
      setPlace('');
      console.log(weather);
    }
      }
  
  return (
    <div className="App">
      <img src={Hot} />
      <div className="app-container">

        <h1>Weather App</h1>
        <form onSubmit={searchApi} className="form-control">
          <input type="text" placeholder="Search..." value={place} onChange={(e) => setPlace(e.target.value)} className="input-field" />
          {/* <button type="submit" className="btn">Search</button> */}
        </form>

        {(typeof weather.main === "undefined") ? ('') : 
        (<div>
          <div className="result">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>{date_week} {date_day} {date_month} {date_year}</p>
            <h3>{Math.round(weather.main.temp)}°c</h3>

            <div className="min-max">
              <div className="min">
                <h4>{Math.round(weather.main.temp_min)}°c</h4>
                <p>min</p>
              </div>
              <div className="divider"></div>
              <div className="min">
                <h4>{Math.round(weather.main.temp_max)}°c</h4>
                <p>max</p>
              </div>
            </div>
          </div>
        </div>)
        }
      </div>
    </div>
  );
}

export default App;
