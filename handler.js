var util = require('./core/util/util');
var config = require('./config');
var weather = require('./core/code/weather');
var location = require('./core/code/location');
var joke = require('./core/code/joke');
exports.messageHandler = function (bot, msg) {
    switch (true) {
        case msg.hasOwnProperty('text'):
            handleText(bot, msg);
            break;
        case msg.hasOwnProperty('voice'):
            break;
        case msg.hasOwnProperty('photo'):
            break;
        case msg.hasOwnProperty('video'):
            break;
        case msg.hasOwnProperty('document'):
            break;
        case msg.hasOwnProperty('location'):
            handleLocation(bot, msg);
            break;
        case msg.hasOwnProperty('sticker'):
            break;
        default:
            bot.sendMessage(msg.chat.id, "I don't know what you said :( ,/start for more details");
            break;
    }

}

function handleText(bot, msg) {
    var args = msg.text.split(" ");
    var command = args[0].toLowerCase();
    switch (command) {
        case "/start":
            bot.sendMessage(msg.chat.id, "Hi there, I am running in beta mode so if i say something gibberish then deal with it " +
                "\ntype /movie to get a list of movies \ntype /weather <cityname> for weather info \ntype /joke for a random joke" +
                "\ntype /catfacts for random cat facts" + "\nsend me location to get Info about it");
            break;
        case "/movie":
            util.req("https://yts.ag/api/v2/list_movies.json?limit=1").then(function (obj) {
                obj.data.movies.forEach(function (movie) {
                    bot.sendChatAction(msg.chat.id, "upload_photo").then(function () {
                        bot.sendPhoto(msg.chat.id, movie.medium_cover_image).then(function () {
                            util.getMovieString(movie).then(function (string) {
                                bot.sendMessage(msg.chat.id, string, config.markdown);
                            })
                        })
                    })
                })

            }).catch(function (error) {

            });
            break;
        case "/weather":
            weather.getWeather(args[1]).then(function (str) {
                bot.sendMessage(msg.chat.id, str, config.markdown);
            }).catch(function (error) {

            });
            break;
        case "/joke":
            joke.getJoke().then(function (string) {
                bot.sendMessage(msg.chat.id, string);
            });
            break;
        case "/catfacts":
            util.req("http://catfacts-api.appspot.com/api/facts").then(function (data) {
                bot.sendMessage(msg.chat.id, "*Random Fact* : " + data.facts[0], config.markdown);
            });
            break;
        default:
            bot.sendMessage(msg.chat.id, "I don't know what you said :( /start for more details");
            break;
    }
}

function handleLocation(bot, msg) {
    var lati = msg.location.latitude;
    var long = msg.location.longitude;
    location.getLocationDetails(lati, long).then(function (string) {
        bot.sendMessage(msg.chat.id, string, config.markdown);
    });
}