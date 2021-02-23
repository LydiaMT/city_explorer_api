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

////////// Location //////////
app.get('/location', handleGetLocation);
function handleGetLocation(request, response){
  const dataFromTheFile = require('./data/location.json');
  const output = new Location(dataFromTheFile, request.query.city);
  response.send(output);
}

function Location(dataFromTheFile, cityName){
  this.search_query = cityName;
  this.formatted_query = dataFromTheFile[0].display_name;
  this.latitude = dataFromTheFile[0].lat;
  this.longitude = dataFromTheFile[0].lon;
}

////////// Weather //////////
// time = valid_date" // path = weatherJSON.data[0].valid_date
// forecast = description // path = weatherJSON.data[0].weather.description

app.get('/weather', handleGetWeather);
function handleGetWeather(request, response){
  const weatherJSON = require('./data/weather.json');
  const output = [];
  // time
  for (let i = 0; i < weatherJSON.data.length; i++) {
    output.push(new Weather(weatherJSON.data[i]));
  }
  response.send(output);
}

function Weather(data) {
  this.forecast = data.weather.description;
  this.time = data.valid_date;
}

// ============== Initialization ========================
app.listen(PORT, () => console.log(`app is up on port http://localhost:${PORT}`)); // this is what starts the server
