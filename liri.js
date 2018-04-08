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



function showTweets () {
	if (operand = "my-tweets"){
		return myTweets();
	};

};

function showSpotify() {
	if (operand = "spotify-this-song" + argument){
		return spotifySong()
	};
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

showTweets();
showSpotify();

