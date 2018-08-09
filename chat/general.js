module.exports = (bot, msg) => {
switch (true) {
    case msg.text == 'معلوماتي' :
    bot.sendMessage(msg.chat.id, ` Name :  ${msg.from.first_name} \n\nID :${msg.from.id}`)
        break
    default:
        break
}
}