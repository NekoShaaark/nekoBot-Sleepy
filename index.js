//imports
const Discord = require('discord.js');
const { Intents } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

//intents
const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})


//startup
client.on('ready', () => {
    console.log("*yaaaawn* Can I go back to sleep?")

    //handler setup
    let handler = require('./command-handler')
    if(handler.default) handler = handler.default

    handler(client);


    //user presence
    client.user.setPresence({
        activities: [{
            name: 'Shark Simulator',
            type: 'PLAYING'
        }],
        status: 'online'
    })
})




//login
client.login(process.env.DISCORD_TOKEN)