const config = require("./config.json");
const Discord = require('discord.js');
const app = require("./app.js");
const fs = require('fs')


var helper = require("./commandsHelper.js");
var cardHelper = require("./cardHelper.js");

const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
})




client.on('messageCreate', async msg => {
    var msg_content = (msg.content)
    if (!msg_content.startsWith("!")) return;
    if (!helper.isCommand(msg_content)) return;

    let data = cardHelper.getDataFromMessage(msg)

    await cardHelper.generateCardImg(data)
    let path = './tmp_files/' + data.discord_nick + data.discord_discriminator + ".jpeg"


    msg.channel.send({
        files: [path]
    });


    console.log(path)
    console.log(">Image sended")


    // console.log(data)
    //console.log('ENTRA')
    //Obtener imagen perfil URL (png)
    // console.log(msg.author.displayAvatarURL({format:"png"}))
    //)

    //helper.isCommand("MELARC");
});







function sendCard() {
    let client = app.getDiscordClient();
    console.log("--OK")
}





client.on('ready', () => {
    console.log('>Bot started');
});







function startBot() {
    client.login(config.BOT_TOKEN);
}









module.exports = {
    sendCard: sendCard,
    startBot: startBot
}