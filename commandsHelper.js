//Comands and description object
const commands_obj = {
    card: {
        function: "initGenerateCard",
        description: "Shows the current user card. Using \"!card username\" shows the specific card from others."
    },
    help: {
        function: "showHelpCommands",
        description: "Shows a list with all commands."
    },
    cardbot: {
        function: "showBotInfo",
        description: "Shows general information about the bot.."
    },
    author: {
        function: "showAuthorInfo",
        description: "Shows general information about the bot.."
    },

}



//Check if command exists
function isCommand(msg) {
    let msg_content = msg.replace("!", "");
    let command = msg_content.split(/[ ,]+/)[0]

    if (commands_obj.hasOwnProperty(command.toLowerCase())) return true
    else return false

}


function getFunctionCommand(command) {
    let cmd = command.toLowerCase()
    if (commands_obj[cmd].function) return commands_obj[cmd].function
    else return false
}

//Get commands obj
function getCommandsObj() {
    return commands_obj
}





module.exports = {
    isCommand: isCommand,
    getFunctionCommand: getFunctionCommand,
    getCommandsObj: getCommandsObj
}