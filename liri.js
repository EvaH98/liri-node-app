require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var inputString = process.argv;
var operand = inputString[2];


if (operand = "my-tweets"){
	var params = {screen_name: '4iamlight'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		
  		if (!error) {
    		console.log(JSON.stringify(tweets, null, 2));
  		}
	});
};

if (operand = "spotify-this-song"){
	var song = inputString[3];
	spotify.search({ type: 'track', query: song }, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}
 
		console.log(JSON.stringify(data, null, 2)); 
	});
}