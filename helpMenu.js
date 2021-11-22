//imports
const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const getFiles = require('./get-files');


//export
module.exports = (message) => {
    
    //variables
    const commandNames = {}
    const commandDescriptions = {}
    const helpEmbed = new MessageEmbed()
    const commandFiles = getFiles('./commands', '.js')


    //command loop
    for(const command of commandFiles){
        let commandFile = require(command)

        const commandName = commandFile.config.commandName
        const commandDescription = commandFile.config.description

        commandNames[commandName.toLowerCase()] = commandFile
        commandDescriptions[commandDescription] = commandFile
    }


    //array mapping
    const commandName = Object.keys(commandNames)
    const commandDescription = Object.keys(commandDescriptions)
    console.log(commandName)
    console.log(commandDescription)

    
    //embed settings
    helpEmbed
        .setTitle('Help Menu')
        .setColor('#1e90ff')

    //embed field(s) loop
    for(let i = 0; i < commandName.length; i++)
    { helpEmbed.addField(commandName[i], commandDescription[i], false) }

    message.channel.send({ embeds: [helpEmbed] })
}