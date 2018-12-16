require("dotenv").config();
var keys = require("./keys.js");
var request = require('request');
var fs = require("fs");
var command = process.argv[2];

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// format concert times
// do-what-it-says

function spotifySearch() {
    var name = process.argv.slice(3).join(" ");
    spotify.search({
        type: 'track', query: name
    },
        function (err, body) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            else {
                var returnData = body.tracks.items[0];
                var songData = [
                    ("artist: " + returnData.artists[0].name),
                    ("song title: " + returnData.name),
                    ("link: " + returnData.external_urls.spotify),
                    ("album: " + returnData.album.name)
                ].join("\n");
                fs.appendFile("log.txt", songData + "\n\n\n")
                console.log(songData);
            };
        });
}

function concertSearch() {
    var artist = process.argv.slice(3).join(" ");
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(URL, function (err, response, body) {
        var concertData = JSON.parse(body);
        var logData = [
            ("venue: " + concertData[0].venue.name),
            ("city: " + concertData[0].venue.city + ", " + concertData[0].venue.region),
            ("date: " + concertData[0].datetime)
        ].join("\n");
        fs.appendFile("log.txt", logData + "\n\n\n")
        console.log(logData);
    });
}

function movieSearch() {
    var title = process.argv.slice(3).join(" ");
    var URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + title;
    request(URL, function (err, response, body) {
        var movieData = JSON.parse(body);
        var logData = [
            ("title: " + movieData.Title),
            ("release year: " + movieData.Year),
            ("imdb rating: " + movieData.imdbRating),
            ("rotten tomato score: " + movieData.Ratings[1].Value),
            ("produced in: " + movieData.Country),
            ("language: " + movieData.Language),
            ("plot: " + movieData.Plot),
            ("actors: " + movieData.Actors)
        ].join("\n");
        fs.appendFile("log.txt", logData + "\n\n\n")
        console.log(logData);
    });
}

if (command === "spotify-this-song"); {
    spotifySearch();
};

if (command === "concert-this") {
    concertSearch()
};

if (command === "movie-this") {
    movieSearch();
};

// if (command === "do-what-it-says") {
//     var searchArr = require("./random.txt").split(",");
//     var searchType = searchArr[0];
//     var searchTerm = searchArr[1].join(" ");

//     if (searchType === "spotify-this-song") {
//         spotifySearch(searchTerm)
//     };
// };