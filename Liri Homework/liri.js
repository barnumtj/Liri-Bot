require("dotenv").config();
var fs = require("fs");
var twitter = require("twitter");
var spotify = require("spotify");
var omdb = require("omdb");
var request = require("request");
var input1 = process.argv[2];
var keys = require("./keys.js");
var twitter1 = new twitter(keys.twitter)
// var spotify1 = new spotify(keys.spotify)
var input2 = process.argv[3];
// console.log(spotify1)


if (input1 === "my-tweets") {

    var params = {
        screen_name: 'barnumtj',
        count: 20

    };
    twitter1.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
   
            for (var i = 0; i < tweets.length; i++) {
                var date = tweets[i].created_at;
                console.log("@barnumtj: " + tweets[i].text + " Created At: " + date.substring(0, 19));
                //seperator
                console.log("-----------------------");
            }

        }
    });
}
else if (input1 === "movie-this") {

    var queryUrl = "http://www.omdbapi.com/?t=" + input2 + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    request(queryUrl, function (error, response, body) {


        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);

            console.log(body)
            // * Title of the movie.
            console.log("Title: " + body.Title)
            // * Year the movie came out.
            console.log("Year: " + body.Year)
            // * IMDB Rating of the movie.
            console.log("IMDB Rating: " + body.imdbRating)
            // * Rotten Tomatoes Rating of the movie.
            console.log("Rotten Tomatoes: " + body.Ratings[1].Value)
            // * Country where the movie was produced.
            console.log("Country Produced: " + body.Country)
            // * Language of the movie.
            console.log("Language: " + body.Language)
            // * Plot of the movie.
            console.log("Plot: " + body.Plot)
            // * Actors in the movie.
            console.log("Actors: " + body.Actors)



        }
    });
}
else if (input1 === "spotify-this-song") {
    spotify.search({ type: 'track', query: "a milli" }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;

        }
        console.log(data)
    });

        // Do something with 'data'
}


