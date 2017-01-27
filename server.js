var mongoose = require('mongoose');
var telegramBot = require('node-telegram-bot-api')
var token = "328192395:AAHbFDLH4irRHu975qIfWAVu2HOwoLfWyE8";
var handler = require('./handler');
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