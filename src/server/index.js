
// For using the .env file to help hide PII
// Reference variables you created in the .env file by putting process.env in front of it
const dotenv = require('dotenv');
dotenv.config();

// For the nlp (natural language processing)
const aylien = require("aylien_textapi");
// set aylien API credentias
var textapi = new aylien({
    application_id: "your-api-id",
    application_key: "your-key"
  });

// set aylien API credentials
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
