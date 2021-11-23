//imports
const Discord = require('discord.js');
const hugInfo = require('../../jsonFolder/hug-command.json');


//export
module.exports = {
    config: {
        name: 'Hug',
        aliases: ['cuddle'],
        category: 'Actions',
        commandName: 'hug',
        description: "Hug the pinged or non-pinged user",
        cooldown: {
            usages: 1,
            timeLimit: 3
        },
        syntax: '',
        example: 'a.hug <user>'
    },


    //runs the command
    callback: async(message, ...args) => {

        //variables
        var userMentioned
        var hugPrefix
        const userContent = message.content.split(' ')
        const userUsername = message.author.username
        const userAvatar = message.author.displayAvatarURL()
        
        
        //hug links and ending
        const hugLinkNum = Math.floor(Math.random() * hugInfo.links.length)
        const hugEndingNum = Math.floor(Math.random() * hugInfo.endings.length)


        //determines if user was pinged or not
        if(message.mentions.users.first()){
            userMentioned = message.mentions.users.first().username }
             
        //check for string after prefix
        else if(userContent[1]){
            hugPrefix = userContent[0] + ' '
            userMentioned = message.content.slice(hugPrefix.length)}

        //no string after prefix
        else{ userMentioned = 'everyone' }


        //embed for hug
        const hugEmbed = new Discord.MessageEmbed()
            .setColor('#0F52A3')
            .setAuthor(`${userUsername} hugs ${userMentioned} ${hugInfo.endings[hugEndingNum]}`, userAvatar)
            .setImage(hugInfo.links[hugLinkNum])

        message.channel.send({ embeds: [hugEmbed] })
    }
}