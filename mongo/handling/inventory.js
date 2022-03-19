//imports
const mongo = require('../mongo')
const userSchema = require('../schemas/userSchema')
const user = require('./user')



//---fish---//

//ANCHOR ADD fish
module.exports.addFish = async (guildId, userId, commonFishCaught, rareFishCaught, epicFishCaught) => {
    return await mongo().then(async mongoose => {

        //findOneAndUpdate()
        try{
            console.log('Running findOneAndUpdate()')
            const result = await userSchema.findOneAndUpdate({ guildId, userId }, { guildId, userId,

                //add fish
                "$inc": {
                    "profile.inventory.fish.commonFish": commonFishCaught,
                    "profile.inventory.fish.rareFish": rareFishCaught,
                    "profile.inventory.fish.epicFish": epicFishCaught }},
                { upsert: true, new: true })
                console.log('RESULT:', result)

            //return data
            return result.profile.inventory.fish }

        //close connection to database
        finally{
            mongoose.connection.close()
            .then(() => {console.log("--Connection to Project_nekoBot closed--")})
        }
    })
}



//---fishing rods---//

//ANCHOR equip rod
module.exports.equipRod = async (guildId, userId, rodRarity) => {
    return await mongo().then(async (mongoose) => {

        //rarity checker
        const equippedRarity = rodRarity.toLowerCase()
        

        //findOneAndUpdate()
        try{
            console.log('Running findOneAndUpdate()')
            const result = await userSchema.findOneAndUpdate({ guildId, userId }, { guildId, userId,

                //set rod
                "$set": {
                    "profile.inventory.rods.equippedRod": equippedRarity }},
                { upsert: true, new: true })
                console.log('RESULT:', result)

                //return data and reset cache
                user.resetCache()
                return result.profile.inventory.rods.equippedRod }

            //close connection to database
            finally{
                mongoose.connection.close()
                .then(() => {console.log("--Connection to Project_nekoBot closed--")})
        }
    })
}


//ANCHOR obtain rod
module.exports.obtainRod = async (guildId, userId, rodRarity) => {
    return await mongo().then(async (mongoose) => {

        //defaults
        var rareObtained = false
        var epicObtained = false
        var ultraObtained = false

        //rarity checker
        switch(rodRarity){
            case "rare": rareObtained = true; break
            case "epic": epicObtained = true; break
            case "ultra": ultraObtained = true; break
        }
        

        //findOneAndUpdate()
        try{
            console.log('Running findOneAndUpdate()')
            const result = await userSchema.findOneAndUpdate({ guildId, userId, }, { guildId, userId,

                //set rod
                "$set": {
                    "profile.inventory.rods.rareRod": rareObtained,
                    "profile.inventory.rods.epicRod": epicObtained,
                    "profile.inventory.rods.ultraRod": ultraObtained }},
                { upsert: true, new: true })
                console.log('RESULT:', result)

            //return data and reset cache
            user.resetCache()
            return result.profile.inventory.rods }

        //close connection to database
        finally{
            mongoose.connection.close()
            .then(() => {console.log("--Connection to Project_nekoBot closed--")})
        }
    })
}