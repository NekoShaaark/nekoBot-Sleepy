//imports
const { MessageEmbed } = require('discord.js');
const getFiles = require('./get-files');


//export
module.exports = (message) => {
    
    //variables & commands
    const actionCommands = { name: {}, description: {} }
    const miscCommands = { name: {}, description: {} }
    const utilityCommands = { name: {}, description: {} }
    const allCommands = { name: {}, description: {} }
    
    const commandFiles = getFiles('./commands', '.js')
    const messageContent = (message.content).toLowerCase()

    var actions = ""
    var misc = ""
    var utility = ""


    //command loop
    for(const command of commandFiles){
        let commandFile = require(command)

        
        // category handling
        const configName = commandFile.config.commandName
        const configDescription = commandFile.config.description

        //--Actions--//
        if(commandFile.config.category == "Actions"){ 
            actionCommands.name[configName] = commandFile
            actionCommands.description[configDescription] = commandFile }

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



    //array mapping
    //--Actions--//
    action_commandName = Object.keys(actionCommands.name)
    action_commandDescription = Object.keys(actionCommands.description)

    //--Misc--//
    misc_commandName = Object.keys(miscCommands.name)
    misc_commandDescription = Object.keys(miscCommands.description)

    //--Utility--//
    utility_commandName = Object.keys(utilityCommands.name)
    utility_commandDescription = Object.keys(utilityCommands.description)


    //category loop
    //--Actions--//
    for(var i = 0; i < action_commandName.length; i++){ 
        actions += `**${action_commandName[i]}:** ` + action_commandDescription[i] + "\n" }

    //--Misc--//
    for(var i = 0; i < misc_commandName.length; i++){ 
        misc += `**${misc_commandName[i]}:** ` + misc_commandDescription[i] + "\n" }

    //--Utility--//
    for(var i = 0; i < utility_commandName.length; i++){ 
        utility += `**${utility_commandName[i]}:** ` + utility_commandDescription[i] + "\n" }


    //category args
    //--Actions--//
    if(messageContent.includes("actions")){
        message.channel.send(`
__**Help Menu - Action Commands**__ \n
__Actions__
${actions}`)}
    
    //--Misc--//
    else if(messageContent.includes("misc")){
        message.channel.send(`
__**Help Menu - Misc. Commands**__ \n
__Misc.__
${misc}`)}
    
    //--Utility--//
    else if(messageContent.includes("utility")){
        categoryName = "Help Menu - Utility Commands"
        message.channel.send(`
__**Help Menu - Utility Commands**__ \n
__Utility__
${utility}`)}

    //--All--//
    else{
        message.channel.send(`
__**Help Menu - All Commands**__ \n
__Actions__
${actions}
__Misc.__
${misc}
__Utility__
${utility}`)
    }
}