//imports
//none


//export
module.exports = {
    config: {
        name: 'Ping',
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