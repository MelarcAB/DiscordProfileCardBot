const config = require("./config.json");
const Discord = require('discord.js');
const fs = require("fs");
const nodeHtmlToImage = require('node-html-to-image')

//Exports
var discordHelper = require("./discordHelper.js");


//Vars




//Init
discordHelper.startBot();

//Events










function getDiscordClient(){
    return client;
}


module.exports = {
    getDiscordClient: getDiscordClient,
}

//const client = new Discord.Client();





//Init bot discord

//client.login(config.BOT_TOKEN);


















/*

//Función para generar imagen a partir de la plantila
function generateCardImg() {
    let template_html = fs.readFileSync(__dirname + '/templates/card_template.html', 'utf8');
    let css_content = fs.readFileSync(__dirname + '/templates/style.css', 'utf8');

    let vars_render = {
        css_content: css_content,
        discord_nick :"Melarc#1006",
        name: "MelarcAB",
        description : "Desarrollador web/Artista. Un genio entre genios.",
        img : ""
    }

    nodeHtmlToImage({
            output: './test.jpeg',
            html: template_html,
            content: vars_render
        })
        .then(() => console.log('The image was created successfully! :O'))
}

generateCardImg();


*/