// Setup empty JS object to act as endpoint for all routes
serverData = {};

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

//GET rout for getting the nlp sumarry of the url given
app.post('/nlp', function (req, res) {
  //try {
    
    nlp.sentiment(
      {
        //url: serverData.site,
        text: req.body.text
      }, 
      function(error, response) {
        if (error === null)
          res.send(response);
        }
    )
  // }
  // catch(error) {
  //   console.log('error in getting summary', error);
  // }
  // res.send(serverData);
})


// POST route.  Just adds the url to summarize
app.post('/nlp', function (request, response) {
  //console.log('made it to the server post')
  serverData.site = request.body.site;
  response.send(serverData);
});

// //Function to summarize the data in the url using the aylien api
// // Puts the summary into the serverData object
// async function getSummary(){
//   ret = []
//   await nlp.summarize(
//     {
//       url: serverData.site,
//       sentences_number: 4
//     }, 
//     function(error, response) {
//       if (error === null) {
//         response.sentences
//       }
//     });
//   try {
//     console.log(ret);
//   }
//   catch {
//     console.log('error in getSummary()', error);
//   }
// }



// app.get('/nlp', function (req, res) {
//   console.log(nlp.summarize({
//     url: 'http://techcrunch.com/2015/04/06/john-oliver-just-changed-the-surveillance-reform-debate',
//     sentences_number: 3
//   }, function(error, response) {
//     if (error === null) {
//       response.sentences.forEach(function(s) {
//         console.log(s);
//       });
//     }
//   }));
//   res.send(nlp)
// })

