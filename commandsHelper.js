module.exports = {
    isCommand: isCommand
}

const commands_arr = ['show']

//Comprueba el comando introducido
function isCommand(msg) {
    let msg_content = msg.replace("!", "");
    let command = msg_content.split(/[ ,]+/)[0]
    if (commands_arr.includes(command)) return true
    else return false
}