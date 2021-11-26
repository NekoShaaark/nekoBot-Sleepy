//imports
const fs = require('fs');
const getFiles = require('./get-files');


//export
module.exports = (client) => {

    //variables
    const commands = {}
    const prefix = process.env.PREFIX
    const commandFiles = getFiles('./commands', '.js')
    console.log(commandFiles)


    //command loop
    for(const command of commandFiles){
        let commandFile = require(command)
        if(commandFile.default) commandFile = commandFile.default
        
        //config check
        if(!commandFile.config){
            console.log('Config object not found')
            return; }
        
        else{
            const commandName = commandFile.config.commandName
            commands[commandName.toLowerCase()] = commandFile }
        }


    //prefix checking
    client.on('messageCreate', (message) => {
        if(message.author.bot || !message.content.startsWith(prefix)){
            return;
        }

        const args = message.content.slice(prefix.length).split(/ +/)
        const commandName = args.shift().toLowerCase()

        if(!commands[commandName]){
            return;
        }

        try{
            commands[commandName].callback(message, ...args)
        } catch(error) {
            console.error('ERROR:', error)
        }
    })
}