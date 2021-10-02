const nodeHtmlToImage = require('node-html-to-image')
const fs = require("fs");

const discordHelper = require("./discordHelper.js");


//Generate img(card) using data generated -> getDataFromMessage(msg)
async function generateCardImg(data) {
    let template_html = fs.readFileSync(__dirname + '/templates/card_template.html', 'utf8');

    const image = await nodeHtmlToImage({
            output: './tmp_files/' + data.discord_nick + data.discord_discriminator + ".jpeg",
            html: template_html,
            content: data
        })
        .then(() => console.log('>Card generated for user ' + data.discord_nick + "#" + data.discord_discriminator))
}



//Prepare data to send
function getDataFromMessage(msg) {
    let css_content = fs.readFileSync(__dirname + '/templates/style.css', 'utf8');
    let data = {
        discord_nick: msg.author.username,
        discord_id: msg.author.id,
        discord_discriminator: msg.author.discriminator,
        discord_img_url: msg.author.displayAvatarURL({
            format: "png"
        }),
        css_content: css_content,
        card_description: "Això és la descripció \n\n\r\r <br> test"
    }
    return data
}


module.exports = {
    generateCardImg: generateCardImg,
    getDataFromMessage: getDataFromMessage

}