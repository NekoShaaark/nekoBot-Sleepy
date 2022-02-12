//imports
const mongo = require('../mongo')
const userSchema = require('../schemas/userSchema')


//cache
const profileCache = {}



//ANCHOR GET profile
module.exports.getProfile = async (guildId, userId) => {

    //return cache if available
    const cachedValue = profileCache[`${guildId}-${userId}`]
    if(cachedValue){
        console.log('returned cache')
        return cachedValue }
    

    //open connection to database
    return await mongo().then(async mongoose => {
        
        //findOne()
        try{
            const result = await userSchema.findOne({ guildId, userId })
            console.log('Running findOne()')
            console.log('RESULT:', result)


            //defaults and object structure
            //currency
            let currency = {
                coins: 0,
                cookies: 0 }

            //inventory
            let inventory = {
                fish:{
                    commonFish: 0,
                    rareFish: 0,
                    epicFish: 0 },
                rods:{
                    commonRod: true,
                    rareRod: false,
                    epicRod: false,
                    ultraRod: false,
                    equippedRod: "common" }
            }

            //profile (everything above)
            let profile = {
                currency,
                inventory }


            //document checking (if no document, insert a new one)
            if(result){
                profile = {
                    currency:{
                        coins: result.profile.currency.coins,
                        cookies: result.profile.currency.cookies },
    
                    inventory:{
                        fish:{
                            commonFish: result.profile.inventory.fish.commonFish,
                            rareFish: result.profile.inventory.fish.rareFish,
                            epicFish: result.profile.inventory.fish.epicFish },
                        rods:{
                            commonRod: result.profile.inventory.rods.commonRod,
                            rareRod: result.profile.inventory.rods.rareRod,
                            epicRod: result.profile.inventory.rods.epicRod,
                            ultraRod: result.profile.inventory.rods.ultraRod,
                            equippedRod: result.profile.inventory.rods.equippedRod }}
                    }
                }

            else{
                console.log('Inserting a document')
                await new userSchema({ guildId, userId, profile })
                .save() 
            }

            
            //cache and return data
            profileCache[`${guildId}-${userId}`] = result.profile
            return profile }
        
        //close connection to database
        finally{
            mongoose.connection.close()
            .then(() => {console.log("Connection to Project_nekoBot closed.")})
        }
    })
}