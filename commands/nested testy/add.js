module.exports = {
    callback: (message, ...args) => {
        let sum = 0

        for(const arg of args){
            sum += parseInt(arg)
        }

        message.reply(`Da answer is ${sum}`)
    }
}