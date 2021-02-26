'use strict';

// ============== Packages ==============================
const express = require('express');
const superagent = require('superagent');
const cors = require('cors');
const pg = require('pg');
require('dotenv').config();

// ============== App ===================================
const app = express();
app.use(cors());
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => console.log(error));

const PORT = process.env.PORT || 3002;
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const PARKS_API_KEY = process.env.PARKS_API_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const YELP_API_KEY = process.env.YELP_API_KEY;

// ============== Routes ================================
////////// Pathway //////////
app.get('/location', handleGetLocation);
app.get('/weather', handleGetWeather);
app.get('/parks', handleGetParks);
app.get('/movies', handleGetMovies);
app.get('/yelp', handleGetYelp);
////////// Functions //////////

function handleGetLocation(request, response){
  const sqlCheckingString = 'SELECT * FROM location_table WHERE search_query=$1';
  const sqlCheckingArray = [request.query.city];
  client.query(sqlCheckingString, sqlCheckingArray)
    .then( input => {
      if (input.rows.length > 0){
        response.send(input.rows[0]);
      } else {
        const city = request.query.city;
        const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${city}&format=json`;
        superagent.get(url).then(locationThatComesBack => {
          const output = new Location(locationThatComesBack.body, request.query.city);
          response.send(output);
          const sqlString = 'INSERT INTO location_table (search_query, formatted_query, latitude, longitude) VALUES($1, $2, $3, $4)';
          const sqlArray = [request.search_query, request.formatted_query, request.latitude, request.longitude];
          client.query(sqlString, sqlArray).then(() => {
            response.redirect('/');
          });
        }).catch(errorThatComesBack => {
          console.log(errorThatComesBack);
          response.status(500).send('Sorry something went wrong');
        });
      }
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
  const url = `https://developer.nps.gov/api/v1/parks?limit=3&start=0&q=${parkCode}&sort=&api_key=${PARKS_API_KEY}`;
  superagent.get(url)
    .then(parkThatComesBack => {
      const parkArray = parkThatComesBack.body.data;
      const output = parkArray.map(parkValue => new Parks(parkValue));
      response.send(output);
    })
    .catch(errorThatComesBack => {
      console.log(errorThatComesBack);
      response.status(500).send('Sorry something went wrong');
    });
}

function handleGetMovies(request, response){
  const movieRequest = request.query.search_query;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${movieRequest}`;
  superagent.get(url)
    .then(movieThatComesBack => {
      const movieArray = movieThatComesBack.body.results;
      const output = movieArray.map(movieValue => new Movies(movieValue));
      response.send(output);
    })
    .catch(errorThatComesBack => {
      console.log(errorThatComesBack);
      response.status(500).send('Sorry something went wrong');
    });
}

function handleGetYelp(request, response) {
  const offset = (request.query.page - 1) * 5;
  const lat = request.query.latitude;
  const lon = request.query.longitude;
  const url = `https://api.yelp.com/v3/businesses/search?term=restaurant&limit=5&latitude=${lat}&longitude=${lon}&offset=${offset}`;
  superagent.get(url)
    .set('authorization', `bearer ${YELP_API_KEY}`)
    .then(restaurantsThatComesBack => {
      const restaurantArray = restaurantsThatComesBack.body.businesses;
      console.log(restaurantArray);
      const output = restaurantArray.map(restaurantValue => new Yelp(restaurantValue));
      response.send(output);
    })
    .catch(errorThatComesBack => {
      console.log(errorThatComesBack);
      response.status(500).send('Sorry something went wrong');
    });
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

function Movies(movieData){
  this.title = movieData.original_title;
  this.overview = movieData.overview;
  this.average_votes = movieData.vote_average;
  this.total_votes = movieData.vote_count;
  this.image_url = `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`;
  this.popularity = movieData.popularity;
  this.released_on = movieData.release_date;
}

function Yelp(yelpData){
  this.name = yelpData.name;
  this.image_url = yelpData.image_url;
  this.price = yelpData.price;
  this.rating = yelpData.rating;
  this.url = yelpData.url;
}

// ============== Initialization ========================
client.connect().then(() => {
  app.listen(PORT, () => console.log(`app is up on port http://localhost:${PORT}`));
});
