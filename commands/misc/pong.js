//imports
//none


//export
module.exports = {
    config: {
        name: 'Pong',
        aliases: [],
        category: 'Misc',
        commandName: 'pong',
        description: "Replies to the user's message with 'pong2'",
        syntax: '',
        example: ''
    },


    //runs the command
    callback: async(message, ...args) => {

        message.reply('pong2')
        
    }
}