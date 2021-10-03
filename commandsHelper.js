const commands_arr = ['show']

//Check if command exists
function isCommand(msg) {
    let msg_content = msg.replace("!", "");
    let command = msg_content.split(/[ ,]+/)[0]
    if (commands_arr.includes(command)) return true
    else return false
}


function getFunctionCommand(command) {

    switch (command) {
        case "show":
            return "initGenerateCard"
            break;
    }
}









module.exports = {
    isCommand: isCommand,
    getFunctionCommand: getFunctionCommand
}