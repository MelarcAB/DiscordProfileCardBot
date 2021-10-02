//Declaración constantes
const config = require("./config.json");
const Discord = require('discord.js');
const fs = require("fs");
const nodeHtmlToImage = require('node-html-to-image')

const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
})

//Exports
var helper = require("./commandsHelper.js");


//Vars



//Events
client.on('messageCreate', msg => {
    var msg_content = (msg.content)
    if (!msg_content.startsWith("!") ) return;
    if (!helper.isCommand(msg_content) ) return;

    console.log("correcte")
    //console.log('ENTRA')
    //Obtener imagen perfil URL (png)
    // console.log(message.author.displayAvatarURL({format:"png"}))

    //helper.isCommand("MELARC");
});

client.on('ready', () => {
    console.log('>Bot started');
});



client.login(config.BOT_TOKEN);










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