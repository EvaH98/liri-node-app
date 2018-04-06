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