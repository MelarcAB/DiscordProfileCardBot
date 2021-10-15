const config = require("./config.json");
const mongoose = require('mongoose');
mongoose instanceof mongoose.Mongoose; // true

//User model
var User = mongoose.model('configs', {
    nick: String,
    title: String,
    description: String,
    img: String,
    username: String,
    discriminator: String,
    user_id: String,
    configuration: {
        color: String,
        title_color: String,
        text_color: String,
        shadow_color: String,
        font_type: Number,
        background_color: String,
        background_img: String

    }
});


//Start mongoose connection to db
async function startConnection() {
    await mongoose.connect(config.MONGOOSE_CONNECTOR);
}

//Find user by user+discriminator (Testuser#0000)
async function findUserByNick(nick) {
    let user = await User.find({
        'nick': nick
    })
    return (user[0]);
}


//Generate User from message
async function createUserByMessage(msg) {
    let nick_id = ""
    if ((msg.content.replace("!", "")).split(/[ ,]+/).length > 1) {
        nick_id = (msg.content.replace("!", "")).split(/[ ,]+/)[1]
    } else {
        nick_id = msg.author.username + "#" + msg.author.discriminator
    }

    user = User.create({
        nick: nick_id,
        title: nick_id + " title",
        description: "To edit this description use  \n \"!cardDescription This is the new description.\"",
        img: msg.author.displayAvatarURL({
            format: "png"
        }),
        username: msg.author.username,
        user_id: msg.author.id,
        discriminator: msg.author.discriminator,
        configuration: {
            color: "yellow",
            title_color: "red",
            text_color: "blue",
            shadow_color: "green",
            font_type: 1,
            background_color: "",
            background_img: ""
        }
    })

    return user;

}



async function cardUserNewValue(usernick, field, value) {
    let user = await findUserByNick(usernick);

    let update = false

    //Search field in User object
    if (typeof user[field] !== 'undefined') {
        update = true
        user[field] = value
    }
    //Search field in User.configuration object
    else if (typeof user.configuration[field] !== 'undefined') {
        update = true
        user.configuration[field] = value
    }
    
    if (update) {
        let update_user = await User.findOneAndUpdate({
            'nick': usernick
        }, user, {
            new: true
        });

      
        return update
    }

    return update
}


mongoose.connection.once('open', function () {
    console.log(">Connection DB: OK");
}).once('error', function (error) {
    console.log(">Connection DB error!!");
})


module.exports = {
    startConnection: startConnection,
    findUserByNick: findUserByNick,
    createUserByMessage: createUserByMessage,
    cardUserNewValue: cardUserNewValue,
}