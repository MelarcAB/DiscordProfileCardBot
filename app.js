const config = require("./config.json");
const Discord = require('discord.js');
const fs = require("fs");
const nodeHtmlToImage = require('node-html-to-image')

//Custom modules
var discordHelper = require("./discordHelper.js");

//Init bot
discordHelper.startBot();

function getDiscordClient(){
    return client;
}


module.exports = {
    getDiscordClient: getDiscordClient,
}
