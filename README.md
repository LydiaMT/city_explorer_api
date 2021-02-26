# City Explorer API

**Author**: Lydia Minehan-Tubic
**Version**: 3.0.7 

## Overview

In labs 6 through 9, you will be building a stand-alone back end which will interact with a static front end. You will request data from a total of six third-party APIs, modify the data as needed, and send the data to the client to be displayed in the browser. In labs 8 and 9, you will be persisting data in a SQL database.

Every day you will have a new partner. You and your new partner(s) will spend the first 45 minutes reviewing each other’s code from the previous day and planning out the days work on the whiteboard.

Create an instance on Heroku (Reference Lab 6). In the Deploy tab, connect your instance to your repository and enable automatic deploys from your master branch. Deploy your application and make sure there are no errors.

**Lab 6:**
For this lab assignment, you will convert a location entered by the user into a latitude and longitude, then use those values to request weather information for that location
1. Repo set up
2. Locations: As a user of City Explorer, I want to enter the name of a location so that I can see data about the area of interest to me.
3. Weather: As a user, I want to request current weather information so that I can learn more about the typical weather patterns in the location I had entered.


**Lab 7:**
1. Errors: As a user, I want clear messages if something goes wrong so I know if I need to make any changes or try again in a different manner.
2. Data formatting: As a user, I want the application to provide properly formatted data so that I can view similar data for any location I choose.
3. Locations: As a user, I want to enter the name of a location so that I do not need to look up the latitude and longitude every time I learn about a new location.
4. Weather: As a user, I want to request current weather information at any location, so that I can learn more about the typical weather patterns in the area of interest.
5. Parks: As a user, I want to request information about parks and campgrounds in the area so that I can see details about what parks are nearby.

**Lab 8:**
1. Database: As a user, I want the application to perform quickly, so that I can search for locations frequently and reliably.
2. Server: As a user, I want the application to perform quickly so that I can search for locations frequently and reliably.
3. Deploy: As a user, I want the application to perform quickly so that I can search for locations frequently and reliably.
4. STRETCH: Server: As a user, I want the application to work with recent results, so that I can see info without the app doing unnecessary API calls.

**Lab 9:** 
1. Movies: As a user, I want to request information about movies that are connected to the area, so that users can learn more about the location.
2. Yelp: As a user, I want to request information about restaurants in the area so that users can view recommendations based on the search query.
3. Pagination

## Getting Started

* [My Trello Board](https://trello.com/b/sSaHEaTj/lab-6-9-city-explorer-trello-board)

## Architecture

```sh
lab-06-repository
   ├── data
   |     ├── weather.json
   |     └── location.json
   ├── .env
   ├── .eslintrc.json
   ├── .gitignore
   ├── package-lock.json
   ├── package.json
   └── server.js
```

* [Front End](https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/)
* [Node JS Docs](https://nodejs.org/en/)
* [NPM JS Docs](https://docs.npmjs.com/)
* [Express JS Docs](http://expressjs.com/en/4x/api.html)
* [dotenv Docs](https://www.npmjs.com/package/dotenv)
* JSON data
* JavaScript

## Change Log

* 02-22-2021 2:00pm - Project start Day 1 - Lab 6
* 02-22-2021 3:00pm - First Commit
* 02-22-2021 3:30pm - Added Location
* 02-22-2021 4:00pm - Added Weather
* 02-22-2021 5:00pm - Final Push
* 02-23-2021 3:00pm - Project start Day 2 - Lab 7
* 02-23-2021 3:30pm - Refactored with .map()
* 02-23-2021 4:00pm - Added location API
* 02-23-2021 5:0pm - added .catch
* 02-23-2021 6:00pm - finalized weather
* 02-23-2021 7:00pm - Got Parks to work
* 02-23-2021 8:00pm - Final Push
* 02-24-2021 3:30pm - Project start Day 3 - Lab 8
* 02-24-2021 6:15pm - First push - added database and updated location function
* 02-25-2021 2:30pm - Project start Day 4 - Lab 9 
* 02-25-2021 3:45pm - Added movie features



## User Acceptance Tests

* Number and name of feature: Lab 6 | Day 1 - 3 Features (Skipping Errors goal for today)
* Estimate of time needed to complete: 6
* Start time: 2pm
* Finish time: 5pm
* Actual time needed to complete: 3 hours
----------
* Number and name of feature: Lab 7 | Day 2 - 5 Features
* Estimate of time needed to complete: 6
* Start time: 3pm
* Finish time: 8pm
* Actual time needed to complete: 5
----------
* Number and name of feature: Lab 8 | Day 3 - 4 Features
* Estimate of time needed to complete: 6
* Start time: 3pm
* Finish time: 7:30pm
* Actual time needed to complete: 4
----------
* Number and name of feature: Lab 9 | Day 4 - 3 Features
* Estimate of time needed to complete: 6
* Start time: 2:30pm
* Finish time: 4:45pm
* Actual time needed to complete: 2.25

## Credits and Collaborations

* TBD
* TBD
