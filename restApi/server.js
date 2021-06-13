var express       = require('express')        // call express
var http          = require('http')
var app           = express()                  // define our app using express
var bodyParser    = require('body-parser')
var path          = require('path')
var cors          = require('cors')

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); //

require('./routes.js')(app);

app.use(express.static(path.join(__dirname, './')));
// Save our port
var port = process.env.PORT || 80;

// Start the server and listen on port
app.listen(port,function(){
  console.log("Web on port: " + port);
});
