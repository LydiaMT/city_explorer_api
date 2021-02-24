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
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const PARKS_API_KEY = process.env.PARKS_API_KEY;

// ============== Routes ================================
////////// Pathway //////////
app.get('/location', handleGetLocation);
app.get('/weather', handleGetWeather);
app.get('/parks', handleGetParks);
app.get('/yelp', handleGetYelp);
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
function handleGetParks(request, response) {
  const parkCode = request.query.formatted_query;
  const url = `https://developer.nps.gov/api/v1/parks?limit=10&start=0&q=${parkCode}&sort=&api_key=${PARKS_API_KEY}`;
  // console.log(request.query);
  superagent.get(url).then(parkThatComesBack => {
    // console.log(parkThatComesBack);
    const output = parkThatComesBack.body.data.map(parkValue => {
      return new Parks(parkValue);
    });
    response.send(output);
  }).catch(errorThatComesBack => {
    console.log(errorThatComesBack);
    response.status(500).send('Sorry something went wrong');
  });
}
function handleGetYelp(request, response) {
  const output = "Yelp capabilities coming soon!";
  response.send(output);
}
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
function Parks(parkData){
  this.name = parkData.fullName;
  this.address = `${parkData.addresses[0].line1} ${parkData.addresses[0].city} ${parkData.addresses[0].stateCode} ${parkData.addresses[0].postalCode}`;
  this.fee = parkData.entranceFees[0].cost;
  this.description = parkData.description;
  this.url = parkData.url;
}

// ============== Initialization ========================
app.listen(PORT, () => console.log(`app is up on port http://localhost:${PORT}`));
