// // Setup empty JS object to act as endpoint for all routes
// serverData = {};

// For using the .env file to help hide PII
// Reference variables you created in the .env file by putting process.env in front of it
const dotenv = require('dotenv');
dotenv.config();

// For the nlp (natural language processing)
const aylien = require("aylien_textapi");
// set aylien API credentials
var nlp = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

// Set up express and needed packaged
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// Initial directory to use
// This is the default directory after webpack packs things up
// Can be changed in the output in the config files if wanted
app.use(express.static('dist'))

// Define what port to use
const port = 8081;

// Callback function for the server listener
function listening() {
  console.log('Natural language processing app running');
  console.log(`Running on localhost: ${port}`);
}

// designates what port the app will listen to for incoming requests
app.listen(port, listening);

//Just for initial testing
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

//GET rout for getting the nlp sumarry of the statement given
app.post('/nlp', function (req, res) {

    nlp.summarize(
      {
        url: req.body.text,
        sentences_number: 3
      }, 
      function(error, response) {
        if (error === null)
          res.send(response);
        }
    )
})


