var util = require('./util');
var config = require('./config');
var weather = require('./core/code/weather');
exports.messageHandler = function (bot, msg) {
    handleText(bot, msg);
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
            break;
        case msg.hasOwnProperty('sticker'):
            break;
        default:
            bot.sendMessage(msg.chat.id, "I don't know what you said :(");
            break;
    }

}

function handleText(bot, msg) {
    var args = msg.text.split(" ");
    var command = args[0].toLowerCase();
    switch (command) {
        case "/start":
            bot.sendMessage(msg.chat.id, "Hi there, I am running in beta mode so if i say something gibberish then deal with it \ntype /movie to get a list of movies \ntype /weather");
            break;
        case "/movie":
            util.req("https://yts.ag/api/v2/list_movies.json?limit=1").then(function (obj) {
                obj = JSON.parse(obj);
                obj.data.movies.forEach(function (movie) {
                    bot.sendChatAction(msg.chat.id, "upload_photo").then(function () {
                        bot.sendPhoto(msg.chat.id, movie.medium_cover_image).then(function () {
                            util.getMovieString(movie).then(function (string) {
                                bot.sendMessage(msg.chat.id, string, config.markdown);
                            })
                        })
                    })
                })

            });
            break;
        case "/weather":
            weather.getWeather(args[1]).then(function (str) {
                bot.sendMessage(msg.chat.id, str);
            });
            break;
        default:
            bot.sendMessage(msg.chat.id, "I don't know what you said :(");
            break;


    }
}