const nodeHtmlToImage = require('node-html-to-image')
const fs = require("fs");
const discordHelper = require("./discordHelper.js");


//Functions
//Generate img(card) using data generated -> getDataFromMessage(msg)
async function generateCardImg(data) {
    let template_html = fs.readFileSync(__dirname + '/templates/card_template.html', 'utf8');

    const image = await nodeHtmlToImage({
            output: './tmp_files/' + data.discord_nick + data.discord_discriminator + ".png",
            html: template_html,
            content: data
        })
        .then(() => console.log('>Card generated for user ' + data.discord_nick + "#" + data.discord_discriminator))
}



//Prepare data to send
function getDataFromMessage(msg, user) {
    let css_content = fs.readFileSync(__dirname + '/templates/style.css', 'utf8');
    //Replace css vars to custom configuration
    if (user != [] || user != null) {

    } else {
        // user = getDefaultTemplate()
    }

    let data = {
        discord_nick: msg.author.username,
        discord_id: msg.author.id,
        discord_discriminator: msg.author.discriminator,
        discord_img_url: msg.author.displayAvatarURL({
            format: "png"
        }),
        css_content: css_content,
        card_description: user.description,
        card_title: user.title,
    }

    return data
}



//Generate data to send to template (HTML)
async function getDataFromUser(user) {
    let css_content = fs.readFileSync(__dirname + '/templates/style.css', 'utf8');

    css_content = await getTemplateStyle(user)

    let data = {
        discord_nick: user.username,
        discord_id: user.user_id,
        discord_discriminator: user.discriminator,
        discord_img_url: user.img,
        css_content: css_content,
        card_description: user.description,
        card_title: user.title,
    }
    return data
}



//Generate style template (css) from user config
async function getTemplateStyle(user) {
    //let css_content = fs.readFileSync(__dirname + '/templates/style.css', 'utf8');

    let css_content = await fs.readFileSync(__dirname + '/templates/style_template.txt', 'utf8');

    //Background vars
    //Put user fields to style template
    css_content = css_content.replace("B_COLOR", user.configuration.background_color)
    css_content = css_content.replace("B_LINK", user.configuration.background_img)
    css_content = css_content.replace("TITLE_COLOR", user.configuration.title_color)
    css_content = css_content.replace("TEXT_COLOR", user.configuration.text_color)
    css_content = css_content.replace("COLOR_1", user.configuration.color)
    css_content = css_content.replace("COLOR_2", user.configuration.color2)


    return css_content

}








//Export functions
module.exports = {
    generateCardImg: generateCardImg,
    getDataFromMessage: getDataFromMessage,
    getDataFromUser: getDataFromUser
}