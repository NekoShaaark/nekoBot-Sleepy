//imports


//export
module.exports = {
    config: {
        name: 'ping',
        aliases: ['p'],
        category: 'Utility',
        commandName: 'ping',
        description: "Replies to the user's message with 'pong'",
        syntax: '',
        example: ''
    },


    //runs the command
    callback: async(message, ...args) => {

        message.reply('pong')
        
    }
}