const config = require("./config.json");
const Discord = require('discord.js');
const app = require("./app.js");
const fs = require('fs')
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
})



var helper = require("./commandsHelper.js");
var cardHelper = require("./cardHelper.js");

var storedFunctions = {}

//On message received
client.on('messageCreate', async msg => {
    var msg_content = (msg.content)
    if (!msg_content.startsWith("!")) return;
    if (!helper.isCommand(msg_content)) return;

    let functionCommand = helper.getFunctionCommand(msg_content.replace("!", "").split(/[ ,]+/)[0]);

    //Call function using functionCommand
    storedFunctions[functionCommand](msg)



});



storedFunctions.initGenerateCard= async function (msg){
    let data = cardHelper.getDataFromMessage(msg)
    let generated_card = await cardHelper.generateCardImg(data)
    let path = './tmp_files/' + data.discord_nick + data.discord_discriminator + ".jpeg"
    await msg.channel.send({
        files: [path]
    });

    fs.unlinkSync(path);
    console.log(">Card removed : "+path)
}









//INIT DISCORD BOT CLIENT ----------------------------------------------
client.on('ready', () => {
    console.log('>Bot started');
});

//Put bot online
function startBot() {
    client.login(config.BOT_TOKEN);
}









module.exports = {
    startBot: startBot
}