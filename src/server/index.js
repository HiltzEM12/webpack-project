
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

//console.log(__dirname)

// app.get('/', function (req, res) {
//     res.sendFile('dist/index.html')
//     //res.sendFile(path.resolve('src/client/views/index.html'))
// })

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.get('/api', function (req, res) {
  console.log(nlp.summarize({
    url: 'http://techcrunch.com/2015/04/06/john-oliver-just-changed-the-surveillance-reform-debate',
    sentences_number: 3
  }, function(error, response) {
    if (error === null) {
      response.sentences.forEach(function(s) {
        console.log(s);
      });
    }
  }));
  res.send(nlp)
})
