const config = require("./config.json");
const Discord = require('discord.js');
const app = require("./app.js");
const fs = require('fs')
const {
    MessageEmbed
} = require('discord.js');

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
    if (!functionCommand) return;


    //Call function using functionCommand
    storedFunctions[functionCommand](msg)



});


//Functions
storedFunctions.initGenerateCard = async function (msg) {
    let data = cardHelper.getDataFromMessage(msg)
    let generated_card = await cardHelper.generateCardImg(data)
    let path = './tmp_files/' + data.discord_nick + data.discord_discriminator + ".jpeg"
    await msg.channel.send({
        files: [path]
    });

    fs.unlinkSync(path);
    console.log(">Card removed : " + path)
}

storedFunctions.showHelpCommands = async function (msg) {
    /* await msg.channel.send({
         files: [path]
     });*/
}


storedFunctions.showBotInfo = async function (msg) {



}

storedFunctions.showAuthorInfo = function (msg) {

    const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Melarc#1006')
        .setURL('https://melarcab.com/')
        .setAuthor('Melarc AB', 'https://cdn.discordapp.com/avatars/141909410019540992/7f0b7bb5849c41f6cc6ea63975856a30.jpeg', 'https://discordapp.com/users/141909410019540992')
        .setDescription('Web developer and digital artist.')
        .setThumbnail('https://cdn.discordapp.com/avatars/141909410019540992/7f0b7bb5849c41f6cc6ea63975856a30.jpeg')
        .setFooter('Visita mi página web', 'https://cdn.discordapp.com/avatars/141909410019540992/7f0b7bb5849c41f6cc6ea63975856a30.jpeg');
    msg.channel.send({
        embeds: [exampleEmbed]
    });
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