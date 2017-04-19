/**
 * Created by calleyoneil on 4/14/17.
 */

var Twitter = require('twitter');
var twitterKeys = require("./keys.js");
var fs = require('fs');

var myTwitter = new Twitter({
    consumer_key: twitterKeys.consumer_key,
    consumer_secret: twitterKeys.consumer_secret,
    access_token_key: twitterKeys.access_token_key,
    access_token_secret: twitterKeys.access_token_secret
});

var spotify = require('spotify');

var request = require('request');

var command = process.argv[2];

inputArray = [];

for (var i = 3; i < process.argv.length; i++) {
    inputArray.push(process.argv[i]);
}

var input = inputArray.join("+");



function myTweets() {
    myTwitter.get('statuses/user_timeline', {screen_name: 'calleyoneil', count: 20}, function(error, tweets, response) {
        if (error) {
            console.log(error)
        }
        else {
            for (var i = 0; i < tweets.length; i++) {
                console.log("------------------------------")
                console.log("Tweet: " + tweets[i].text);
                console.log("Posted: " + tweets[i].created_at)
            }
        }
    });
}

function spotifyThisSong(input) {
    if (input==undefined) {
        console.log("Artist: Ace of Bass");
        console.log("Song: The Sign");
        console.log("Preview URL: https://p.scdn.co/mp3-preview/177e65fc2b8babeaf9266c0ad2a1cb1e18730ae4?cid=null");
        console.log("Album: The Sign (US Album) [Remastered]");
    }
    else {
        spotify.search({type: 'track', query: input}, function(error, data) {

            if (error) {
                console.log('Error occurred: ' + err);
                return;
            }
            else {
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Song: " + data.tracks.items[0].name);
                console.log("Preview URL: " + data.tracks.items[0].preview_url);
                console.log("Album: " + data.tracks.items[0].album.name);
            }
        })
    }
}

function movieThis(input) {
    if (input==undefined) {
        input = "Mr.+Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&tomatoes=true&r=json";

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMBD Rating: " + JSON.parse(body).imdbRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
        }
    });
}

switch (command) {
    case "my-tweets":
        console.log("Fetching Calley's tweets...");

        myTweets();
        break;

    case "spotify-this-song":
        console.log("Checking my record collection...");

        spotifyThisSong(input);
        break;

    case "movie-this":
        console.log("Let me see if I can find that title...");

        movieThis(input);
        break;

    case "do-what-it-says":
        console.log("Doing what it says...");

        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
                console.log('Error occurred: ' + error);
                return;
            }
            else if (data.indexOf('my-tweets') > -1){
                myTweets();
            }
            else if (data.indexOf('spotify-this-song') > -1){
                var responseString = JSON.stringify(data);
                var prompt = responseString.replace("spotify-this-song", "");
                spotifyThisSong(prompt);
            }
            else if (data.indexOf('movie-this') > -1){
                var responseString = JSON.stringify(data);
                var prompt = responseString.replace("movie-this", "");
                movieThis(prompt);
            }
            else {
                console.log("Looks like there's nothing good in the Random file :(")
            }
        });
        break;
}

//
// everything you get from the npm

// request('http://www.google.com', function (error, response, body) {
//     console.log('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     console.log('body:', body); // Print the HTML for the Google homepage.
// });
//
//
//
// spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
//     if ( err ) {
//         console.log('Error occurred: ' + err);
//         return;
//     }
//
//     // Do something with 'data'
// });
//
//
//
//
//
// var params = {screen_name: 'nodejs'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//     if (!error) {
//         console.log(tweets);
//     }
// });