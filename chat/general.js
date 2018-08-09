const admin = require('./admin')
module.exports = (bot, msg) => {
switch (true) {
    case msg.text == 'معلوماتي' :
    bot.sendMessage(msg.chat.id, ` Name :  ${msg.from.first_name} \n\nID :${msg.from.id}`)
    break
    case (msg.from.id == '280942102' || msg.from.id == '383063938'):
    //admin(bot, msg)
    break
    default:
    break
}
}