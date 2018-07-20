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

run(input1, input3);

// for loop for putting + in place of a space in movie title to get correct query
// for (var i = 3; i < input.length; i++) {

//     if (i > 3 && i < input.length) {

//        movieName = movieName + "+" + nodeArgs[i];

//     }

//     else {

//         movieName += nodeArgs[i];

//     }
function run() {

if (input1 === "my-tweets") {
    twitterFun();

} else if (input1 === "movie-this") {
    OMDBFun();
} else if (input1 === "spotify-this-song") {
    spotifyFun();

} else if (input1 === "do-whatever-it-says") {
    doWhatever();
}
}

function twitterFun() {
    var params = {
        screen_name: 'barnumtj',
        count: 20


    }; console.log(params)
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

function OMDBFun() {

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
function spotifyFun() {
    if (input3.length < 1) {
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
};
function doWhatever() {

    fs.readFile("./random.txt", "utf-8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        // Break the string down by comma separation and store the contents into the output array.

        var dataArr = data.split(',');
       
        let input1 = dataArr[0]
        let input3 = dataArr[1];
        console.log(input1, input3)

      


        

		
    });
}