module.exports = (bot, msg) => {
switch (true) {
    case msg.text == 'معلوماتي' :
    bot.sendMessage(msg.chat.id, ` Name :  ${msg.from.first_name} \n\nID :${msg.from.id}`)
    break
    case msg.text.startsWith('خالة قولي'):
    const match = msg.text.match(/خالة قولي (.+)/)
    bot.sendMessage(msg.chat.id,  match[1])
    break
    default:
    break
}
}