//imports
const mongoose = require('mongoose')


//exports
module.exports = async() => {
    
    //established connection and options
    mongoose.connect(process.env.MONGODB_SRV, {
        useNewUrlParser: true,
        useUnifiedTopology: true })

    .then(() => {console.log('Connection to Project_nekoBot established.')})
    .catch((err) => {console.log(err)});
    return mongoose;
}