//imports
const mongoose = require('mongoose')

//variables
const reqString = { type: String, required: true }
const reqNum = { type: Number, default: 0 }
const reqBool = { type: Boolean, default: false }


//--schema creation--//
const userSchema = mongoose.Schema({
    
    //ids
    guildId: reqString,
    userId: reqString,


    //profile
    profile:{

        //currency
        currency:{
            coins: reqNum,
            cookies: reqNum
        },

        //inventory
        inventory:{
            fish:{
                commonFish: reqNum,
                rareFish: reqNum,
                epicFish: reqNum },
            rods:{
                commonRod: reqBool,
                rareRod: reqBool,
                epicRod: reqBool,
                ultraRod: reqBool,
                equippedRod: reqString }
        }
    }

    //daily claims
    // daily:{}

}, {timestamps: true})


//exports
module.exports = mongoose.model('users', userSchema)