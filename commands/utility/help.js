//imports
const helpMenu = require('../../helpMenu')


//export
module.exports = {
    config: {
        name: 'Help Menu',
        aliases: ['h', 'hm'],
        category: 'Utility',
        commandName: 'help',
        description: "Shows the help menu for all commands",
        cooldown: {
            usages: 1,
            timeLimit: 5
        },
        syntax: '',
        example: 'a.help'
    },


    //runs the command
    callback: (message, ...args) => {

        helpMenu(message);
    }
}