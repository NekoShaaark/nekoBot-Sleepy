//imports
const getFiles = require('./get-files');


//export
module.exports = (message) => {
    
    //variables & commands
    const actionCommands = { name: {}, description: {} }
    const economyCommands = { name: {}, description: {} }
    const gameCommands = { name: {}, description: {} }
    const miscCommands = { name: {}, description: {} }
    const utilityCommands = { name: {}, description: {} }
    const allCommands = { name: {}, description: {} }
    
    const commandFiles = getFiles('./commands', '.js')
    const userContent = message.content.split(' ')

    var actions = ""
    var economy = ""
    var games = ""
    var misc = ""
    var utility = ""


    //command loop
    for(const command of commandFiles){
        let commandFile = require(command)

        
        // category handling
        const configName = commandFile.config.commandName
        const configDescription = commandFile.config.description
        const configCategory = commandFile.config.category

        switch(configCategory){
            case "Actions":
                actionCommands.name[configName] = commandFile
                actionCommands.description[configDescription] = commandFile
                break;

            case "Economy":
                economyCommands.name[configName] = commandFile
                economyCommands.description[configDescription] = commandFile
                break;

            case "Games":
                gameCommands.name[configName] = commandFile
                gameCommands.description[configDescription] = commandFile
                break;

            case "Misc":
                miscCommands.name[configName] = commandFile
                miscCommands.description[configDescription] = commandFile
                break;

            case "Utility":
                utilityCommands.name[configName] = commandFile
                utilityCommands.description[configDescription] = commandFile
                break;
        }
            //all
            allCommands.name[configName] = commandFile
            allCommands.description[configDescription] = commandFile
    }



    //array mapping
    //--Actions--//
    let action_commandName = Object.keys(actionCommands.name)
    let action_commandDescription = Object.keys(actionCommands.description)

    //--Economy--//
    let economy_commandName = Object.keys(economyCommands.name)
    let economy_commandDescription = Object.keys(economyCommands.description)

    //--Games--//
    let game_commandName = Object.keys(gameCommands.name)
    let game_commandDescription = Object.keys(gameCommands.description)

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

    //--Games--//
    for(var i = 0; i < game_commandName.length; i++){ 
        games += `**${game_commandName[i]}:** ` + game_commandDescription[i] + "\n" }

    //--Misc--//
    for(var i = 0; i < misc_commandName.length; i++){ 
        misc += `**${misc_commandName[i]}:** ` + misc_commandDescription[i] + "\n" }

    //--Utility--//
    for(var i = 0; i < utility_commandName.length; i++){ 
        utility += `**${utility_commandName[i]}:** ` + utility_commandDescription[i] + "\n" }


    //category args
    switch(userContent[1]){
        case "actions":
            message.channel.send(`__**Help Menu - Action Commands**__\n\n__Actions__\n${actions}`)
            break;

        case "economy":
            message.channel.send(`__**Help Menu - Economy Commands**__\n\n__Economy__\n${economy}`)
            break;

        case "games":
            message.channel.send(`__**Help Menu - Game(s) Commands**__\n\n__Games__\n${games}`)
            break;

        case "misc":
            message.channel.send(`__**Help Menu - Misc. Commands**__\n\n__Misc.__\n${misc}`)
            break;
    
        case "utility":
            message.channel.send(`__**Help Menu - Utility Commands**__\n\n__Utility__\n${utility}`)
            break;


        default:
            //if second argument shows singular commands [second arg = command name]
            if(userContent[1]){
                userContent.shift() //remove prefix

                //loop through all commands and output config of command that is given
                for(var i = 0; i < all_commandName.length; i++){
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
__Games__
${games}
__Misc.__
${misc}
__Utility__
${utility}`)
        }
    }
}