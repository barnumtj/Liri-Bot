require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var twitter = require("twitter");
var omdb = require("omdb");
var request = require("request");
var spotify = require("node-spotify-api");
var twitter1 = new twitter(keys.twitter)
var spotify1 = new spotify(keys.spotify)
var nodeArgs = process.argv;
var input = process.argv;
var input1 = process.argv[2];
var input2 = process.argv[3];
var input3 = process.argv.splice(3).join(" ");
// var movieName = "";



// for loop for putting + in place of a space in movie title to get correct query
// for (var i = 3; i < input.length; i++) {

//     if (i > 3 && i < input.length) {

//        movieName = movieName + "+" + nodeArgs[i];

//     }

//     else {

//         movieName += nodeArgs[i];

//     }
// }



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

                console.log("-----------------------");
            }

        }
    });
}

else if (input1 === "movie-this") {
    if (input3.length < 1) {

        input3 = "Mr. Nobody";
    };



    var queryUrl = "http://www.omdbapi.com/?t=" + input3 + "&y=&plot=short&tomatoes=true&apikey=trilogy";


    request(queryUrl, function (error, response, body) {


        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);


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
    if (input3.length < 1){
        input3 = "the sign ace of base"
    }
    spotify1.search({ type: 'track', query: input3 }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;

        }
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song Title: " + data.tracks.items[0].name)
        console.log("Preview URL: " + data.tracks.items[0].preview_url)
        console.log("Album: " + data.tracks.items[0].album.name)
    });

if (input1 === "do") {
    fs.readFile("./random.txt", "utf-8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        // var dataArr = data.split(",");
      
        // // We will then re-display the content as an array for later use.
        // console.log(dataArr);
      
      });
}


}

