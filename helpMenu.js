//imports
const { MessageEmbed } = require('discord.js');
const getFiles = require('./get-files');


//export
module.exports = (message) => {
    
    //variables & commands
    const actionsCommands = { name: {}, description: {} }
    const miscCommands = { name: {}, description: {} }
    const utilityCommands = { name: {}, description: {} }
    const allCommands = { name: {}, description: {} }
    
    const helpEmbed = new MessageEmbed()
    const commandFiles = getFiles('./commands', '.js')


    //command loop
    for(const command of commandFiles){
        let commandFile = require(command)

        
        // category handling
        const configName = commandFile.config.commandName
        const configDescription = commandFile.config.description

        //--Actions--//
        if(commandFile.config.category == "Actions"){ 
            actionsCommands.name[configName] = commandFile
            actionsCommands.description[configDescription] = commandFile }

        //--Misc--//
        if(commandFile.config.category == "Misc"){ 
            miscCommands.name[configName] = commandFile
            miscCommands.description[configDescription] = commandFile }
        
        //--Utility--//
        if(commandFile.config.category == "Utility"){ 
            utilityCommands.name[configName] = commandFile
            utilityCommands.description[configDescription] = commandFile }

        //--All--//
        if(commandFile.config.category){
            allCommands.name[configName] = commandFile
            allCommands.description[configDescription] = commandFile }
    }


    // console.log('ACTIONS:', actionsCommands.name)
    // console.log('MISC:', miscCommands.name)
    // console.log('UTILITY:', utilityCommands.name)
    // console.log('ALL:', allCommands.name)

    //array mapping
    const messageContent = (message.content).toLowerCase()
    var commandName
    var commandDescription

    //--Actions--//
    if(messageContent.includes("actions")){
        commandName = Object.keys(actionsCommands.name)
        commandDescription = Object.keys(actionsCommands.description)}
    
    //--Misc--//
    else if(messageContent.includes("misc")){
        commandName = Object.keys(miscCommands.name)
        commandDescription = Object.keys(miscCommands.description)}
    
    //--Utility--//
    else if(messageContent.includes("utility")){
        commandName = Object.keys(utilityCommands.name)
        commandDescription = Object.keys(utilityCommands.description)}

    //--All--//
    else{
        commandName = Object.keys(allCommands.name)
        commandDescription = Object.keys(allCommands.description)}

    // console.log('------------')
    // console.log('NAMES:', commandName)
    // console.log('DESCRIPTIONS:', commandDescription)
    // console.log('------------')

    
    //embed settings
    helpEmbed
        .setTitle('Help Menu')
        .setColor('#1e90ff')

    //embed field(s) loop
    for(let i = 0; i < commandName.length; i++)
    { helpEmbed.addField(commandName[i], commandDescription[i], false) }

    message.channel.send({ embeds: [helpEmbed] })
}