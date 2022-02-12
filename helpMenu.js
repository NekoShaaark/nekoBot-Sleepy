//imports
const getFiles = require('./get-files');


//export
module.exports = (message) => {
    
    //variables & commands
    const actionCommands = { name: {}, description: {} }
    const economyCommands = { name: {}, description: {} }
    const miscCommands = { name: {}, description: {} }
    const utilityCommands = { name: {}, description: {} }
    const allCommands = { name: {}, description: {} }
    
    const commandFiles = getFiles('./commands', '.js')
    const messageContent = (message.content).toLowerCase()
    const userContent = message.content.split(' ')

    var actions = ""
    var economy = ""
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

        //--Economy--//
        if(commandFile.config.category == "Economy"){ 
            economyCommands.name[configName] = commandFile
            economyCommands.description[configDescription] = commandFile }

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
    let action_commandName = Object.keys(actionCommands.name)
    let action_commandDescription = Object.keys(actionCommands.description)

    //--Economy--//
    let economy_commandName = Object.keys(economyCommands.name)
    let economy_commandDescription = Object.keys(economyCommands.description)

    //--Misc--//
    let misc_commandName = Object.keys(miscCommands.name)
    let misc_commandDescription = Object.keys(miscCommands.description)

    //--Utility--//
    let utility_commandName = Object.keys(utilityCommands.name)
    let utility_commandDescription = Object.keys(utilityCommands.description)

    //--All--//
    let all_commandName = Object.keys(allCommands.name)


    //category loop
    //--Actions--//
    for(var i = 0; i < action_commandName.length; i++){ 
        actions += `**${action_commandName[i]}:** ` + action_commandDescription[i] + "\n" }

    //--Economy--//
    for(var i = 0; i < economy_commandName.length; i++){ 
        economy += `**${economy_commandName[i]}:** ` + economy_commandDescription[i] + "\n" }

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

//--Economy--//
    if(messageContent.includes("economy")){
        message.channel.send(`
__**Help Menu - Economy Commands**__ \n
__Economy__
${economy}`)}
    
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
        //if second argument (command name) (shows singular commands)
        if(userContent[1]){
            userContent.shift() //remove prefix

            //loop through all commands and output config of command that is given
            for (var i = 0; i < all_commandName.length; i++){
                if(userContent.includes(all_commandName[i])){
                    let command = allCommands.name[all_commandName[i]].config

                    //send "command config" message
                    message.channel.send(`
__**Help Menu - ${all_commandName[i]} Command**__ \n
**Aliases:** ${command.aliases}
**Category:** ${command.category}
**Description:** ${command.description}`)
                }
            }
        }


        //if no arguments (shows all commands)
        else{
            message.channel.send(`
__**Help Menu - All Commands**__ \n
__Actions__
${actions}
__Economy__
${economy}
__Misc.__
${misc}
__Utility__
${utility}`)
        }
    }
}