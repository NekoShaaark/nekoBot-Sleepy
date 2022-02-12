//imports
const mongo = require('../mongo')
const userSchema = require('../schemas/userSchema')



//ANCHOR ADD currency
module.exports.addCurrency = async (guildId, userId, coinAmount, cookieAmount) => {
    return await mongo().then(async (mongoose) => {

        //findOne()
        try{
            console.log('Running findOneAndUpdate()')
            const result = await userSchema.findOneAndUpdate({ guildId, userId }, { guildId, userId, 

                //add currency
                "$inc": {
                    "profile.currency.coins": coinAmount,
                    "profile.currency.cookies": cookieAmount }}, 
                { upsert: true, new: true })
                console.log('RESULT:', result)

            //return data
            return result.profile.currency }

        //close connection to database
        finally{
            mongoose.connection.close()
            .then(() => {console.log("Connection to Project_nekoBot closed.")})
        }
    })
}