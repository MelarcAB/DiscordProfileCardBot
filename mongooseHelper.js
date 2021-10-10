const config = require("./config.json");
const mongoose = require('mongoose');
mongoose instanceof mongoose.Mongoose; // true

//User model
var User = mongoose.model('configs', {
    nick: String,
    title: String,
    description: String,
    img : String,
    configuration: {
        color: String,
        title_color: String,
        text_color: String,
        shadow_color: String,
        font_type: Number,
        background_color: String,
        background_img : String

    }
});


//Start mongoose connection to db
async function startConnection() {
    await mongoose.connect(config.MONGOOSE_CONNECTOR);
}

async function findUserByNick(nick) {
    let user = await User.find({
        'nick': nick
    })
    return (user[0]);
}

mongoose.connection.once('open', function () {
    console.log(">Connection DB: OK");
}).once('error', function (error) {
    console.log(">Connection DB error!!");
})


module.exports = {
    startConnection: startConnection,
    findUserByNick: findUserByNick
}