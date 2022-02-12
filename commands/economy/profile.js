//imports
const user = require('../../mongo/handling/user')
const Discord = require('discord.js')


//export
module.exports = {
    config: {
        name: 'Profile',
        aliases: ['p'],
        category: 'Economy',
        commandName: 'profile',
        description: "Shows the user's Profile (if pings a user, will show their Profile)",
        syntax: '',
        example: ''
    },


    //runs the command
    callback: async(message, ...args) => {

        //variables
        const userMentioned = message.mentions.users.first()
        const target = userMentioned || message.author

        const guildId = message.guild.id
        const userId = target.id

        //beginning message
        const profileMessage = await message.channel.send('Fetching all da cookies, pwease wait a sec~');


        //values
        const userProfile = await user.getProfile(guildId, userId)
        let currency = userProfile.currency
        let inventory = userProfile.inventory

        //capitize first Letter function
        function capitalizeFirstLetter(string){ return string.charAt(0).toUpperCase() + string.slice(1) }
        let rodEquipped = `${capitalizeFirstLetter(inventory.rods.equippedRod)} Rod`


        //profile embed
        const profileEmbed = new Discord.MessageEmbed()
            .setColor('#0F52A3')
            .setAuthor({ name: `${target.username}'s Profile`, iconURL: target.displayAvatarURL() })
            .addFields(
                {name: 'Coins <:nekosharkCoin:874230937385324544>', value: `${currency.coins}`, inline: true},
                {name: 'Cookies :cookie:', value: `${currency.cookies}`, inline: true},
                {name: 'Equipped Fishing Rod :fishing_pole_and_fish:', value: `${rodEquipped}`})
            .setFooter({ text: `User ID: ${userId}`})
        
        //send embed (edit message)
        profileMessage.edit({ content: ' ', embeds: [profileEmbed] })

    }
}