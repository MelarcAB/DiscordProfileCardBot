const config = require("./config.json");
const Discord = require('discord.js');
const fs = require("fs");
const nodeHtmlToImage = require('node-html-to-image')

//Custom modules
var discordHelper = require("./discordHelper.js");
var mongooseHelper = require("./mongooseHelper.js");



initBot()



//Init BOT
function initBot() {
    //Start connection
    mongooseHelper.startConnection();
    //After starting connection -> start Bot
    discordHelper.startBot();

}



function getDiscordClient() {
    return client;
}



module.exports = {
    getDiscordClient: getDiscordClient,
}





//TEST
var discordHelper = require("./mongooseHelper.js");