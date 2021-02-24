'use strict';

// ============== Packages ==============================

const express = require('express');
const superagent = require('superagent');
const cors = require('cors');
require('dotenv').config();

// ============== App ===================================

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const WEATHER_API_KEY= process.env.WEATHER_API_KEY;

// ============== Routes ================================

////////// Pathway //////////
app.get('/location', handleGetLocation);
app.get('/weather', handleGetWeather);
// app.get('/parks', handleGetParks);

////////// Functions //////////
function handleGetLocation(request, response){
  const city = request.query.city;
  const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${city}&format=json`;
  superagent.get(url).then(locationThatComesBack => {
    const output = new Location(locationThatComesBack.body, request.query.city);
    response.send(output);
  }).catch(errorThatComesBack => {
    console.log(errorThatComesBack);
    response.status(500).send('Sorry something went wrong');
  });
}

function handleGetWeather(request, response){
  const lat = request.query.latitude;
  const lon = request.query.longitude;
  const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`;
  superagent.get(url).then(weatherThatComesBack => {
    const output = weatherThatComesBack.body.data.map(weatherData => {
      return new Weather(weatherData);
    });
    response.send(output);
  }).catch(errorThatComesBack => {
    console.log(errorThatComesBack);
    response.status(500).send('Sorry something went wrong');
  });
}

// function handleGetParks(request, response) {

// }

////////// Objects //////////
function Location(dataFromTheFile, cityName){
  this.search_query = cityName;
  this.formatted_query = dataFromTheFile[0].display_name;
  this.latitude = dataFromTheFile[0].lat;
  this.longitude = dataFromTheFile[0].lon;
}

function Weather(data) {
  this.forecast = data.weather.description;
  this.time = data.datetime;
}

// function Parks(parkData){
//   this.name = parkData.xxx;
//   this.address = parkData.xxx;
//   this.fee = parkData.xxx;
//   this.description = parkData.xxx;
//   this.url = parkData.xxx;
// }

// ============== Initialization ========================
app.listen(PORT, () => console.log(`app is up on port http://localhost:${PORT}`)); // this is what starts the server
