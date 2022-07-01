//imports
const { MessageActionRow, MessageButton } = require('discord.js')
const Discord = require('discord.js')
const user = require('../../mongo/handling/user')


//export
module.exports = {
    config: {
        name: 'Inventory',
        aliases: ['inv'],
        category: 'Economy',
        commandName: 'inventory',
        description: "Shows all items that the user as in their personal inventory",
        syntax: '',
        example: 'a.inventory <@user>'
    },


    //runs the command
    callback: async(message, ...args) => {

        //variables
        const guildId = message.guild.id
        const userId = message.author.id

        const userProfile = await user.getProfile(guildId, userId)
        const userFish = userProfile.inventory.fish
        const userRods = userProfile.inventory.rods
        const rodEquipped = userProfile.inventory.rods.equippedRod


        //check is user has rods
        var rareRodHas
        var epicRodHas
        var ultraRodHas

        userRods.rareRod ? rareRodHas="Owns" : rareRodHas="Does not own"
        userRods.epicRod ? epicRodHas="Owns" : epicRodHas="Does not own"
        userRods.ultraRod ? ultraRodHas="Owns" : ultraRodHas="Does not own"

    
        //rod equipped
        //capitize first Letter function
        function capitalizeFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1) }
        const embedRodEquipped = `${capitalizeFirstLetter(rodEquipped)} Rod`

        
        //inventory embeds
        //page 1
        const page1Embed = new Discord.MessageEmbed()
            .setColor('#0F52A3')
            .setAuthor({ name: `${message.author.username}'s Inventory`, iconURL: message.author.displayAvatarURL() })
            .setDescription('All da fishy ya caught are here!')
            .addFields(
                {name: 'Common Fish 🐟', value: `${userFish.commonFish}`, inline: true},
                {name: 'Rare Fish 🐠', value: `${userFish.rareFish}`, inline: true},
                {name: 'Epic Fish 🐡', value: `${userFish.epicFish}`, inline: true})
            .setFooter({ text: 'Page 1 of 2' })


        //page 2
        const page2Embed = new Discord.MessageEmbed()
            .setColor('#0F52A3')
            .setAuthor({ name: `${message.author.username}'s Inventory`, iconURL: message.author.displayAvatarURL() })
            .setDescription('All da fishing rods ya own are here! 🎣')
            .spliceFields(0, 3, [ //remove the previous 3 fields starting with an index of 0
                {name: 'Common Rod', value: 'Owns', inline: true},
                {name: 'Rare Rod', value: `${rareRodHas}`, inline: true},
                {name: 'Epic Rod', value: `${epicRodHas}`, inline: true},
                {name: 'Ultra Rod', value: `${ultraRodHas}`, inline: true},
                {name: '\u200b', value: '\u200b'},
                {name: 'Equipped Fishing Rod', value: `${embedRodEquipped}` }])
            .setFooter({ text: 'Page 2 of 2' })



        //buttons
        //page 1 buttons
        const page1Row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('right')
                    .setStyle('PRIMARY')
                    .setEmoji('➡️'))
                
        //page 2 buttons
        const page2Row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('left')
                    .setStyle('PRIMARY')
                    .setEmoji('⬅️'))
        

        //page 1 function
        page1 = () => {
            //set message and start collector
            sentMessage.edit({ content: ' ', embeds: [page1Embed], components: [page1Row]})

            const page1Filter = i => i.user.id === message.author.id
            const page1Collector = sentMessage.createMessageComponentCollector({ page1Filter, time: 1000 * 10 }) //10 seconds
            page1Collector.on('collect', async i => {
                i.deferUpdate()
                if(i.customId === 'right'){
                    page2()
                    return; }
            })
        }


        //page 2 function
        page2 = () => {
            //set message and start collector
            sentMessage.edit({ content: ' ', embeds: [page2Embed], components: [page2Row]})

            const page2Filter = i => i.user.id === message.author.id
            const page2Collector = sentMessage.createMessageComponentCollector({ page2Filter, time: 1000 * 10 }) //10 seconds
            page2Collector.on('collect', async i => {
                i.deferUpdate()
                if(i.customId === 'left'){ 
                    page1() 
                    return; }
            })
        }


        //initial sent message (page 1)
        const sentMessage = await message.channel.send({ content: 'Fetching all da cookies, pwease wait a sec~' })
        page1()

        //TODO: won't allow to use collector more than once (will fix this later)
    }
}