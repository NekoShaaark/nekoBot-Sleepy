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

        //rarity decider(?)
        var equippedRarity
        if(rodRarity == "common"){ equippedRarity = "common" }
        else if(rodRarity == "rare"){ equippedRarity = "rare" }
        else if(rodRarity == "epic"){ equippedRarity = "epic" }

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
module.exports.obtainRod = async (guildId, userId, [rareObtained, epicObtained, ultraObtained]) => {
    return await mongo().then(async (mongoose) => {

        //rarity decider(?)
        if(rareObtained == true){ rareObtained = true }
        if(epicObtained == true){ epicObtained = true }
        if(ultraObtained == true){ ultraObtained = true }

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

            //return data
            return result.profile.inventory.rods }

        //close connection to database
        finally{
            mongoose.connection.close()
            .then(() => {console.log("--Connection to Project_nekoBot closed--")})
        }
    })
}