var util = require('./util');
var config=require('./config');

exports.messageHandler = function (bot, msg) {
    handleText(bot, msg);
    /*
    switch (msg) {
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
    }
    */
}

function handleText(bot, msg) {
    switch (msg.text) {
        case "/start":
            bot.sendMessage(msg.chat.id, "Hi there, type /movie to get a list of movies");
            break;
        case "/movie":
            util.req("https://yts.ag/api/v2/list_movies.json?limit=1").then(function (obj) {
                obj = JSON.parse(obj);
                obj.data.movies.forEach(function (movie) {
                    bot.sendChatAction(msg.chat.id,"upload_photo").then(function(){
                        bot.sendPhoto(msg.chat.id,movie.medium_cover_image).then(function(){
                            util.getMovieString(movie).then(function(string){
                                bot.sendMessage(msg.chat.id,string,config.markdown);
                            })
                        })
                    })                    
                })

            })

    }
}