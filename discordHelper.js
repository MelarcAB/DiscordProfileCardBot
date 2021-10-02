const config = require("./config.json");
const Discord = require('discord.js');
const app = require("./app.js");
const fs = require('fs')


var helper = require("./commandsHelper.js");
var cardHelper = require("./cardHelper.js");

const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
})



//On message received
client.on('messageCreate', async msg => {
    var msg_content = (msg.content)
    if (!msg_content.startsWith("!")) return;
    if (!helper.isCommand(msg_content)) return;

    let data = cardHelper.getDataFromMessage(msg)

    let generated_card = await cardHelper.generateCardImg(data)
    let path = './tmp_files/' + data.discord_nick + data.discord_discriminator + ".jpeg"
    await msg.channel.send({
        files: [path]
    });

    fs.unlinkSync(path);
    console.log(">Card removed : "+path)

});





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