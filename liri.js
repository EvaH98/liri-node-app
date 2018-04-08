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
var argument = inputString[3];




if (operand === "my-tweets"){
	return myTweets();
} else if (operand === "spotify-this-song"){
	return spotifySong();
} else if (operand === "movie-this"){
	return movieThis();
}



function myTweets (){
	var params = {screen_name: '4iamlight', count: 20, exclude_replies:true, trim_user:true};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		
  		if (!error) {
    		for(i=0; i<tweets.length; i++){
    			var date = tweets[i].created_at;
    			console.log("@4iamlight: " + tweets[i].text + " Created At: " + date.substring(0, 19));
    			console.log('----------------------------------------')
    		}
  		} else {
  			console.log(error);
  		}
	});
}

function spotifySong(){
	spotify.search({ type: 'track', query: argument }, function(err, data) {
  		if (!err) {
    		for(var i=0; i<data.tracks.items.length; i++){
    			var songData = data.tracks.items[i];

    			console.log("Artist: " + songData.artists[0].name);
    			console.log("Song: " + songData.name);
    			console.log("Preview URL: " + songData.preview_url);
    			console.log("Album: " + songData.album.name);
    			console.log('----------------------------------------');
    		}
  		}
 
	});
};

function movieThis() {

	var movieName = process.argv[3];

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

	console.log(queryUrl);

	request(queryUrl, function(error, response, body) {

  		if (!error && response.statusCode === 200) {
  		console.log('----------------------------------------');
  		console.log("Title: " + JSON.parse(body).Title);
    	console.log("Release Year: " + JSON.parse(body).Year);
    	console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    	console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    	console.log("Country: " + JSON.parse(body).Country);
    	console.log("Language: " + JSON.parse(body).Language);
    	console.log("Plot: " + JSON.parse(body).Plot);
    	console.log("Actors: " + JSON.parse(body).Actors);
    	console.log('----------------------------------------');
  		}
	});
};


