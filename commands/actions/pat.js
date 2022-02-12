//imports
const Discord = require('discord.js');
const patInfo = require('../../jsonFolder/pat-command.json');


//export
module.exports = {
    config: {
        name: 'Pat',
        aliases: ['headpat'],
        category: 'Actions',
        commandName: 'pat',
        description: "Give the pinged or non-pinged user a pat",
        cooldown: {
            usages: 1,
            timeLimit: 3
        },
        syntax: '',
        example: 'a.pat <user>'
    },


    //runs the command
    callback: async(message, ...args) => {

        //variables
        var userMentioned
        var patPrefix
        const userContent = message.content.split(' ')
        const userUsername = message.author.username
        const userAvatar = message.author.displayAvatarURL()


        //pat links and ending
        const patLinkNum = Math.floor(Math.random() * patInfo.links.length)
        const patEndingNum = Math.floor(Math.random() * patInfo.endings.length)


        //determines if user was pinged or not
        if(message.mentions.users.first()){
            userMentioned = message.mentions.users.first().username }
            
        //check for string after prefix
        else if(userContent[1]){
            patPrefix = userContent[0] + ' '
            userMentioned = message.content.slice(patPrefix.length)}

        //no string after prefix
        else{ userMentioned = 'everyone' }


        //embed for pat
        const patEmbed = new Discord.MessageEmbed()
            .setColor('#0F52A3')
            .setAuthor({ name: `${userUsername} gives ${userMentioned} ${patInfo.endings[patEndingNum]}`, iconURL: userAvatar })
            .setImage(patInfo.links[patLinkNum])

        message.channel.send({ embeds: [patEmbed] })
    }
}