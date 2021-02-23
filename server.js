'use strict';

// ============== Packages ==============================

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// ============== App ===================================

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;
console.log(process.env.PORT);

// ============== Routes ================================

////////// Pathway //////////
app.get('/location', handleGetLocation);
app.get('/weather', handleGetWeather);
// app.get('/parks', handleGetParks);

////////// Functions //////////
function handleGetLocation(request, response){
  const dataFromTheFile = require('./data/location.json');
  const output = new Location(dataFromTheFile, request.query.city);
  response.send(output);
}

function handleGetWeather(request, response){
  const weatherJSON = require('./data/weather.json');
  const output = weatherJSON.data.map((weatherData) => {
    return new Weather(weatherData);
  });
  response.send(output);
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
  this.time = data.valid_date;
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
