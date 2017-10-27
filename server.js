// Dependencies 
var express = require("express");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");
var request = require("request");

//Setting the server
var port = process.env.PORT || 3000;
// Initializing the app
var app = express();
// Setting up body parser
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
// Requiring handlebars and setting it as our view engine
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connecting to the enn-scraper database in Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/enn-scraper", {
  useMongoClient: true
});

// Need to require my models for articles and notes

//Routes ============================================================================================

// Route to the root page:
app.get("/", function(req, res) {
	res.render("index")
});

// A GET route for scraping the enn website
app.get("/scrape", function(req, res) {
  
  // Grabbing the body of the html with request
  request("http://www.enn.com/topics/top_stories/browse/", function(error, response, html) {
  // Loading that into cheerio and saving it to $ 
    var $ = cheerio.load(html);

    // Grab every blogroll div within an article tag, and do the following:
    $("h3", ".blogroll_item").each(function(i, element) {
      // Save an empty result object
      var results = [];
      var title = $(element).text();
      

   		results.push({
    		title: title,
     	});
      console.log(results)
    });
  });
  res.render("scraped");
});

// ===================================================================================================
// Starting the server
app.listen(port, function() {
  console.log("App running on port " + port + "!");
});

