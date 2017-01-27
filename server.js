process.on('uncaughtException', function (err) {
    // All the uncaught exception will come here
    console.log(err);
});

var mongoose = require('mongoose');
var telegramBot = require('node-telegram-bot-api');
var handler = require('./handler');
var express = require('express');
var app = express();
var token;

app.set('port', (process.env.PORT || 5000));



if (process.env.NODE_ENV === 'development') {
    token = "296649568:AAFTfr1wsPZCm0Z-N2eQSEFR-Wj9r3bJtJA"; // voldemort
} else {
    token = "328192395:AAHbFDLH4irRHu975qIfWAVu2HOwoLfWyE8"; // greyhound
}


var bot = new telegramBot(token, {
    polling: true
});

bot.on('message', function (msg) {
    bot.sendChatAction(msg.chat.id, "typing");
    handler.messageHandler(bot, msg);
});


//For avoidong Heroku $PORT error
app.get('/', function (request, response) {
    var result = 'App is running';
    response.send(result);
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});