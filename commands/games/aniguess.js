//imports
const Discord = require('discord.js')
const currency = require('../../mongo/handling/currency')


//export
module.exports = {
    config: {
        name: 'Aniguess',
        aliases: ['akiguess', 'ag'],
        category: 'Games',
        commandName: 'aniguess',
        description: "Guess the correct anime character within the time limit (credit to Aki for game idea)",
        syntax: '',
        example: 'a.aniguess <anime-name>'
    },


    //runs the command
    callback: async(message, ...args) => {

        //variables
        const rareRating = Math.floor(Math.random() * 25) //4% chance
        const ultraRating = Math.floor(Math.random() * 250) //0.4% chance

        const startingTime = Math.floor(Date.now() / 1000)

        var embedProps = {
                guessInfo: '',
                embedColor: '',
                embedTitle: '',
                embedDescription: '' }

        var timeProps = {
                timeLimit: null,
                pointsForTime: null,
                pointsMultipler: null }

        
        //anime picker
        //TODO make dynamic (read folder and add all files into array?)
        var animePath
        const animeArray = ['SwordArtOnline-info', 'konosuba-info']
        const animePicked = Math.floor(Math.random() * animeArray.length)
        const messageContent = (message.content).toLowerCase()

        if(messageContent.includes('sword-art-online')){ animePath = 'SwordArtOnline-info' } //sword-art-online
        else if(messageContent.includes('konosuba')){ animePath = 'konosuba-info' } //konosuba
        else{ animePath = animeArray[animePicked] //random pick
            message.channel.send('Please Note: Not specifying a name of an anime will result in a random anime pick.' + 
            '\nTo specify an anime, use dashes between spaces (eg. *a.aniguess sword-art-online*).') }


        //rarities
        //ultra
        if(ultraRating == 1){
            embedProps.guessInfo = require(`../../jsonFolder/aniguess/${animePath}.json`).ultra
            embedProps.embedColor = '#7202DF'
            embedProps.embedTitle = 'ULTRA RARE CHARACTER APPEARS'
            embedProps.embedDescription = '8 seconds is all ya get! Hurry, Hurry!'
            timeProps.timeLimit = 8000
            timeProps.pointsForTime = 8
            timeProps.pointsMultipler = 5 }


        //rare
        else if(rareRating == 1){
            embedProps.guessInfo = require(`../../jsonFolder/aniguess/${animePath}.json`).rare
            embedProps.embedColor = '#FFD700'
            embedProps.embedTitle = 'RARE CHARACTER APPEARS'
            embedProps.embedDescription = '10 seconds is all ya get! Hurry, Hurry!'
            timeProps.timeLimit = 10000
            timeProps.pointsForTime = 10
            timeProps.pointsMultipler = 3 }


        //default
        else{
            embedProps.guessInfo = require(`../../jsonFolder/aniguess/${animePath}.json`).common
            embedProps.embedColor = '#0F52A3'
            embedProps.embedTitle = 'Character Appears!'
            embedProps.embedDescription = '15 seconds is all ya get! Hurry, Hurry!'
            timeProps.timeLimit = 15000
            timeProps.pointsForTime = 15
            timeProps.pointsMultipler = 1 }


        //filter
        const item = embedProps.guessInfo[Math.floor(Math.random() * embedProps.guessInfo.length)]
        const filter = response => { 
            return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase()) }
        console.log(item.answers)


        //embed
        const aniguessEmbed = new Discord.MessageEmbed()
        .setColor(embedProps.embedColor)
        .setAuthor({ name: 'Guess the character', iconURL: message.author.displayAvatarURL() })
        .setTitle(embedProps.embedTitle)
        .setDescription(embedProps.embedDescription)
        .setImage(item.character)
        message.channel.send({ embeds: [aniguessEmbed] }).then(() => {

            //collector
            console.log('started collector')
            message.channel.awaitMessages({ filter, max: 1, time: timeProps.timeLimit, errors: ['time'] })
                .then(collected => {
                    console.log('collected correct')
                    
                    //calculate how much time is left (coins are given depending on how much time is left)
                    let coins = Math.floor((timeProps.pointsForTime-((new Date().getTime() / 1000) - startingTime)) * timeProps.pointsMultipler)

                    //add coins to user balance
                    let guildId = message.guild.id
                    let userId = collected.first().author.id
                    currency.addCurrency(guildId, userId, coins, 0)

                    message.channel.send(`Yay woo~! ${collected.first().author} got da correct answer! Here is ${coins} coins for answering correctly!!`)
                })

                .catch(collected => {
                    message.channel.send('Awww hope someone answers correctly next time~')
                    console.log('stopped collector')
                    return
                })
        })}
}