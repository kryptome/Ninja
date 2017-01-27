var mongoose = require('mongoose');
var telegramBot = require('node-telegram-bot-api');
var handler = require('./handler');
var token;
if (process.env.NODE_ENV === 'development') {
    token = "296649568:AAFTfr1wsPZCm0Z-N2eQSEFR-Wj9r3bJtJA"; // voldemort
} else {
    token = "328192395:AAHbFDLH4irRHu975qIfWAVu2HOwoLfWyE8"; // greyhound
}
var bot = new telegramBot(token, {
    polling: true
});

process.on('uncaughtException', function (err) {
    // All the uncaught exception will come here
    console.log(err);
});


bot.on('message', function (msg) {
    bot.sendChatAction(msg.chat.id, "typing");
    handler.messageHandler(bot, msg);
});

console.log("everything looks fine");