const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // import mongoose
var gm = require('@google/maps').createClient({
  key: 'AIzaSyCpQZxTXBzu1wIgq3Urm9hGmA0H8GEO2b0'
});

const weather = require('yahoo-weather');

mongoose.connect('mongodb+srv://sarim:9unUIUxT6w0o2mlp@cluster0-hdl6v.mongodb.net/myWaypointsPhase2?retryWrites=true') // connect to mogoDB Atlas online
  .then(() => {
    console.log('Connected to DB');
  }).catch(() => {
    console.log('Connection failed to DB');
  });


const app = express();
var x, z, cityName, stateName;
var places = [];
var uPlaces = [];
var weath = [];
y = [];

app.use(bodyParser.json());

const Weathr = require('./models/weathr'); // import the mongoose schema for weather

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/dispWeather", (req, res, next) => {
  places = [];
  y = []
  const direction = req.body;
  console.log(direction);
  res.status(201).json({message: 'Post added successfully'});
  gm.directions({
    origin: direction[0],
    destination: direction[1],
  }, function(err, response) {
      if (!err) {
            for(i=0; i<response.json.routes[0].legs[0].steps.length; i=i+3) {

              x = response.json.routes[0].legs[0].steps[i].end_location;
              y.push(x);
              gm.reverseGeocode({latlng: [x.lat, x.lng],}, function(err, response){
                  if (!err) {
                    for (var ac = 0; ac < response.json.results[0].address_components.length; ac++) {
                      var component = response.json.results[0].address_components[ac];
                      switch(component.types[0]) {
                          case 'locality':
                            cityName = component.long_name;
                            break;
                          case 'administrative_area_level_1':
                            stateName = component.short_name;
                            break;
                      }
                    };
                    z = cityName + ', ' + stateName;
                    places.push(z);
                  }
              });

            }
        }
    });
  setTimeout(() => {
    uPlaces = new Set(places);
  }, 3000)

  setTimeout(() => {
    weath = [];
    for(let city of uPlaces) {
      weather(city).then(info => {
          let message = `${city}: ${info.item.condition.text} | ${info.item.condition.temp} degrees`;
          console.log(message);
          weath.push(message);
        }).catch(err => {
          console.log('error:', err);
        });
    }

  }, 3000)

  setTimeout(() => { // set data according to mongoose schema and store it in mogo db database
    const weathr = new Weathr({
      directions: direction,
      weather: weath
    });
    weathr.save();
  }, 4000)

});

app.get('/api/dispWeather', (req, res, next) => {
  setTimeout(() => {

    var wA = [weath, y];
    res.status(200).json(wA);
  }, 4000)
});


module.exports = app;

