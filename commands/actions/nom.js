//imports
const Discord = require('discord.js');
const nomInfo = require('../../jsonFolder/nom-command.json');


//export
module.exports = {
    config: {
        name: 'Nom',
        aliases: ['bite'],
        category: 'Actions',
        commandName: 'nom',
        description: "Nom the pinged or non-pinged user",
        cooldown: {
            usages: 1,
            timeLimit: 3
        },
        syntax: '',
        example: 'a.nom <user>'
    },


    //runs the command
    callback: async(message, ...args) => {

        //variables
        var userMentioned
        var nomPrefix
        const userContent = message.content.split(' ')
        const userUsername = message.author.username
        const userAvatar = message.author.displayAvatarURL()


        //nom links and ending
        const nomLinkNum = Math.floor(Math.random() * nomInfo.links.length)
        const nomEndingNum = Math.floor(Math.random() * nomInfo.endings.length)


        //determines if user was pinged or not
        if(message.mentions.users.first()){
            userMentioned = message.mentions.users.first().username }
              
        //check for string after prefix
        else if(userContent[1]){
            nomPrefix = userContent[0] + ' '
            userMentioned = message.content.slice(nomPrefix.length)}

        //no string after prefix
        else{ userMentioned = 'a cookie' }


        //embed for nom
        const nomEmbed = new Discord.MessageEmbed()
            .setColor('#0F52A3')
            .setAuthor(`${userUsername} noms ${userMentioned} ${nomInfo.endings[nomEndingNum]}`, userAvatar)
            .setImage(nomInfo.links[nomLinkNum])

        message.channel.send({ embeds: [nomEmbed] })
    }
}