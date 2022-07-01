//imports
const Discord = require('discord.js')
const inventory = require('../../mongo/handling/inventory')
const user = require('../../mongo/handling/user')


//export
module.exports = {
    config: {
        name: 'Fish',
        aliases: ['akiguess', 'ag'],
        category: 'Games',
        commandName: 'fish',
        description: "Chance to get different types of fish that will be added to the user's personal inventory",
        syntax: '',
        example: 'a.fish'
    },


    //runs the command
    callback: async(message, ...args) => {

        //variables
        const guildId = message.guild.id
        const userId = message.author.id

        const userProfile = await user.getProfile(guildId, userId)
        const rodEquipped = userProfile.inventory.rods.equippedRod


        //capitize first Letter function for embed
        function capitalizeFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1) }
        const embedRodEquipped = `${capitalizeFirstLetter(rodEquipped)} Rod`


        //rod rarity and chances
        var commonCatchChance
        var rareCatchChance
        var epicCatchChance
        var fishCatchChance //how many fish caught
        
        //rod rarity equipped
        switch(rodEquipped){
            case "common":
                commonCatchChance = 3 //33% chance
                rareCatchChance = 4 //25% chance
                epicCatchChance = 20 //5% chance
                fishCatchChance = 2 //catch up to 2 fish
                break;

            case "rare":
                commonCatchChance = 2 //50% chance
                rareCatchChance = 3 //33% chance
                epicCatchChance = 10 //10% chance
                fishCatchChance = 4 //catch up to 4 fish
                break;

            case "epic":
                commonCatchChance = 2 //50% chance
                rareCatchChance = 3 //33% chance
                epicCatchChance = 5 //20% chance
                fishCatchChance = 6 //catch up to 6 fish
                break;

            case "ultra":
                commonCatchChance = 2 //50% chance
                rareCatchChance = 3 //33% chance
                epicCatchChance = 4 //25% chance
                fishCatchChance = 8 //catch up to 8 fish
                break;
        }

        //rarity chance
        const commonRating = Math.floor(Math.random() * commonCatchChance)
        const rareRating = Math.floor(Math.random() * rareCatchChance)
        const epicRating = Math.floor(Math.random() * epicCatchChance)

        //defaults
        var commonFishCaught = 0
        var rareFishCaught = 0
        var epicFishCaught = 0
        //NOTE: Math.random() is run seperately for each rarity to ensure that each rarity gets a different amount (otherwise all will be the same)

        //rarity picker
        if(commonRating == 1){ commonFishCaught = Math.floor(Math.random() * fishCatchChance + 1) } //common
        if(rareRating == 1){ rareFishCaught = Math.floor(Math.random() * fishCatchChance + 1) } //rare
        if(epicRating == 1){ epicFishCaught = Math.floor(Math.random() * fishCatchChance + 1) } //epic


        //ending
        //loading message
        const loadingMessage = await message.channel.send('Counting up how many fishies ya gat, pwease wait a sec~');

        //fishing result embed
        const fishEmbed = new Discord.MessageEmbed()
        .setColor('#0F52A3')
        .setAuthor({ name: `${message.author.username}'s Fishing Results`, iconURL: message.author.displayAvatarURL() })
        .addFields(
            {name: 'Common Fishies 🐟', value: `${commonFishCaught}`},
            {name: 'Rare Fishies 🐠', value: `${rareFishCaught}`},
            {name: 'Epic Fishies 🐡', value: `${epicFishCaught}`},
            {name: '\u200b', value: '\u200b'},
            {name: 'Rod Used 🎣', value: `${embedRodEquipped}`})
        .setFooter({ text: `Hope ya had a nom time fishing!!`})
    
        //send embed (edit message) and give user fishies
        loadingMessage.edit({ content: ' ', embeds: [fishEmbed] })
        inventory.addFish(guildId, userId, commonFishCaught, rareFishCaught, epicFishCaught)
  }
}