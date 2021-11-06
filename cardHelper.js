const nodeHtmlToImage = require('node-html-to-image')
const fs = require("fs");
const discordHelper = require("./discordHelper.js");


//Functions
//Generate img(card) using data generated -> getDataFromMessage(msg)
async function generateCardImg(data) {
    let template_html = (fs.readFileSync(__dirname + '/templates/card_template.html', 'utf8')).replace("/FONTTITLE/g", "font-poppins");

    template_html = setFontsToTemplate(template_html, data)
    //console.log(template_html)
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
        font_title: '',
        font_header: '',
        font_description: '',
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
        font_header: user.configuration.font_header,
        //   font_header:"0",
        font_title: user.configuration.font_title,
        font_description: user.configuration.font_description
    }
    //console.log(data)
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

function setFontsToTemplate(template, data) {





    let title_font = 'arial';
    let header_font = 'arial';
    let description_font = 'arial';

    switch (data.font_header) {
        case "1":
            header_font = "font-poppins"
            break;
        case "2":
            header_font = "font-indie-flower"
            break;
        case "3":
            header_font = "font-crimson"
            break;
        case "4":
            header_font = "font-pacifico"
            break;
        case "5":
            header_font = "font-architects"
            break;
        case "6":
            header_font = "font-permanent"
            break;
        case "7":
            header_font = "font-satisfy"
            break;
        case "8":
            header_font = "font-amatic"
            break;
        case "9":
            header_font = "font-russo"
            break;
        case "10":
            header_font = "font-henny"
            break;
        case "11":
            header_font = "font-gloria"
            break;
        case "12":
            header_font = "font-orbitron"
            break;
        case "13":
            header_font = "font-gluten"
            break;
        case "14":
            header_font = "font-press"
            break;
        case "15":
            header_font = "font-sigmar"
            break;
        case "16":
            header_font = "font-oswald"
            break;
        case "17":
            header_font = "font-ubuntu"
            break;
        case "18":
            header_font = "font-sigmar"
            break;
        case "19":
            header_font = "font-fruktur"
            break;
        case "20":
            header_font = "font-grechen"
            break;
        case "21":
            header_font = "font-creepster"
            break;
        case "22":
            header_font = "font-bungee"
            break;
        case "23":
            header_font = "font-rock"
            break;
        case "24":
            header_font = "font-bubblegum"
            break;
    }

    switch (data.font_title) {
        case "1":
            title_font = "font-poppins"
            break;
        case "2":
            title_font = "font-indie-flower"
            break;
        case "3":
            title_font = "font-crimson"
            break;
        case "4":
            title_font = "font-pacifico"
            break;
        case "5":
            title_font = "font-architects"
            break;
        case "6":
            title_font = "font-permanent"
            break;
        case "7":
            title_font = "font-satisfy"
            break;
        case "8":
            title_font = "font-amatic"
            break;
        case "9":
            title_font = "font-russo"
            break;
        case "10":
            title_font = "font-henny"
            break;
        case "11":
            title_font = "font-gloria"
            break;
        case "12":
            title_font = "font-orbitron"
            break;
        case "13":
            title_font = "font-gluten"
            break;
        case "14":
            title_font = "font-press"
            break;
        case "15":
            title_font = "font-sigmar"
            break;
        case "16":
            title_font = "font-oswald"
            break;
        case "17":
            title_font = "font-ubuntu"
            break;
        case "18":
            title_font = "font-sigmar"
            break;
        case "19":
            title_font = "font-fruktur"
            break;
        case "20":
            title_font = "font-grechen"
            break;
        case "21":
            title_font = "font-creepster"
            break;
        case "22":
            title_font = "font-bungee"
            break;
        case "23":
            title_font = "font-rock"
            break;
        case "24":
            title_font = "font-bubblegum"
            break;
    }

    switch (data.font_description) {
        case "1":
            description_font = "font-poppins"
            break;
        case "2":
            description_font = "font-indie-flower"
            break;
        case "3":
            description_font = "font-crimson"
            break;
        case "4":
            description_font = "font-pacifico"
            break;
        case "5":
            description_font = "font-architects"
            break;
        case "6":
            description_font = "font-permanent"
            break;
        case "7":
            description_font = "font-satisfy"
            break;
        case "8":
            description_font = "font-amatic"
            break;
        case "9":
            description_font = "font-russo"
            break;
        case "10":
            description_font = "font-henny"
            break;
        case "11":
            description_font = "font-gloria"
            break;
        case "12":
            description_font = "font-orbitron"
            break;
        case "13":
            description_font = "font-gluten"
            break;
        case "14":
            description_font = "font-press"
            break;
        case "15":
            description_font = "font-sigmar"
            break;
        case "16":
            description_font = "font-oswald"
            break;
        case "17":
            description_font = "font-ubuntu"
            break;
        case "18":
            description_font = "font-sigmar"
            break;
        case "19":
            description_font = "font-fruktur"
            break;
        case "20":
            description_font = "font-grechen"
            break;
        case "21":
            description_font = "font-creepster"
            break;
        case "22":
            description_font = "font-bungee"
            break;
        case "23":
            description_font = "font-rock"
            break;
        case "24":
            description_font = "font-bubblegum"
            break;
    }

      console.log(header_font)


    template = template.replace("FONT_TITLE", title_font)
    template = template.replace("FONT_HEADER", header_font)
    template = template.replace("FONT_DESCRIPTION", description_font)
    //console.log(description_font);
    return template


}



//Export functions
module.exports = {
    generateCardImg: generateCardImg,
    getDataFromMessage: getDataFromMessage,
    getDataFromUser: getDataFromUser
}