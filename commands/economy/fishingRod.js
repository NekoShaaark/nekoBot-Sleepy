//imports
const user = require('../../mongo/handling/user')
const inventory = require('../../mongo/handling/inventory')


//export
module.exports = {
    config: {
        name: 'Fishing Rod',
        aliases: ['rod'],
        category: 'Economy',
        commandName: 'fishingrod',
        description: "Equip a fishing rod (specify rarity)",
        syntax: ['a.rods -equip <rarity>'],
        example: ''
    },


    //runs the command
    callback: async(message, ...args) => {

        //variables
        const guildId = message.guild.id
        const userId = message.author.id

        const messageContent = (message.content).toLowerCase().split(' ') //split according to spaces
        const userName = message.author.username

        const equipArray = ['equip', '-equip']
        //const obtainArray = ['obtain', '-obtain']  -[testing-purposes]-
        

        const rodRarity = messageContent[2] //rarity index
        var hasRod = false //default false

        const profile = await user.getProfile(guildId, userId)
        const rods = await profile.inventory.rods


        //rarity settings
        switch(rodRarity){
            case "common":
                hasRod = true //all users will have common by default
                break;

            case "rare":
                if(rods.rareRod == true){ hasRod = true }
                break;

            case "epic":
                if(rods.epicRod == true){ hasRod = true }
                break;

            case "ultra":
                if(rods.ultraRod == true){ hasRod = true }
                break;
        }


        //equip rod
        if(equipArray.some(aliases => messageContent.includes(aliases))){
            if(!rodRarity){ message.channel.send('Pwease specify a rarity to equip (common, rare, epic, ultra ...)'); return }
            else if(rods.equippedRod == rodRarity){ message.channel.send("Ya already have dat rod equipped, pwease specify a rod dat isn't equipped~"); return }

            //check if user has the rod to equip
            else{
                if(hasRod == true){
                    const rodMessage = await message.channel.send(`Equipping ${rodRarity} rod...`)
                    rodMessage //create and send message
                    inventory.equipRod(guildId, userId, rodRarity)
                    rodMessage.edit(`${userName} equipped da **${rodRarity} rod**!`)}

                else{ message.channel.send("Sowwy, ya don't have dat rod, pwease try equipping a rod dat ya currently own."); return }
                }
            }

            
            //obtain rod  -[testing-purposes]-
            // else if(obtainArray.some(aliases => messageContent.includes(aliases))){
            //     if(!rodRarity){ message.channel.send('Pwease specify a rarity to obtain (common, rare, epic, ultra ...)'); return }
            //     else if(rods.equippedRod == rodRarity){ message.channel.send("Ya already have dat rod equipped, pwease specify a rod dat isn't equipped~"); return }

            //     //check if user doesn't have the rod to obtain
            //     else{
            //         if(hasRod == false){
            //             const rodMessage = await message.channel.send(`Obtaining ${rodRarity} rod...`)
            //             rodMessage //create and send message
            //             inventory.obtainRod(guildId, userId, rodRarity)
            //             rodMessage.edit(`${userName} obtained ${rodRarity} rod!`)}

            //         else{ message.channel.send("Sowwy, ya already have dat rod, pwease try obtaining a rod dat ya don't currently own."); return }
            //         }
            //     }

        else{ message.channel.send('Pwease use da correct syntax [syntax: "a.fishingrod equip <rarity>"]') }
    }
}