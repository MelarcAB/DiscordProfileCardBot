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
var mongooseHelper = require("./mongooseHelper.js");

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
    //TO DO -> Check if isset username param, in this case we will search the user info. ELSE -> search current user data
    let nick_id = ""
    let createIfNotExists = false
    if ((msg.content.replace("!", "")).split(/[ ,]+/).length > 1) {
        nick_id = (msg.content.replace("!", "")).split(/[ ,]+/)[1]
    } else {
        nick_id = msg.author.username + "#" + msg.author.discriminator
        createIfNotExists = true
    }

    let user = await mongooseHelper.findUserByNick(nick_id)
    if (user === undefined) {
        //Create user if not exist in db
        if (createIfNotExists) {
            user = await mongooseHelper.createUserByMessage(msg)
            console.log("New user created: " + nick_id)
        } else {
            //Send error m
            await msg.channel.send(
                "User not found.\nRemember: To see the card of another user it's necessary that the searched user has generated it at least once."
            )
            return
        }
    }



    // let command_param = (msg.content.replace("!", "")).split(/[ ,]+/)[1].trim();
    // console.log(command_param);

    let user_found = await mongooseHelper.findUserByNick(nick_id);

    //  let data = cardHelper.getDataFromMessage(msg, user_found)
    let data = await cardHelper.getDataFromUser(user_found)
    let generated_card = await cardHelper.generateCardImg(data)
    let path = './tmp_files/' + data.discord_nick + data.discord_discriminator + ".png"

    await msg.channel.send({
        files: [path]
    });

    //Delete generated file from local
    fs.unlinkSync(path);
    console.log(">Card removed : " + path)


}


storedFunctions.generateCardCustomUser = async function (msg) {}



storedFunctions.showHelpCommands = async function (commands) {}


storedFunctions.showBotInfo = async function (msg) {}

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