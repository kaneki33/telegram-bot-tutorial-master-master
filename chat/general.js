const admin   = require('./admin')
const news    = require('../features/news')
const news    = require('../features/lyrics')

module.exports = (bot, msg) => {
    const text = String(msg.text) || ""
switch (true) {
    case text.startsWith('Lyric'):
    const matches = text.match(/Lyric(\s+)(.+)(\s+)-(\s+)(.+)/)
    new Reply({
    art: matches[2],
    song: matches[5]
    })
    lyric(art,song)
        break 
    case text == 'معلوماتي' :
    bot.sendMessage(msg.chat.id, ` Name :  ${msg.from.first_name} \n\nID :${msg.from.id}`)
    news(bot, msg)
    break
    case text.startsWith('حجة قولي'):
    const match = text.match(/حجة قولي (.+)/)
    bot.sendMessage(msg.chat.id,  match[1])
    break
    case (msg.from.id == '280942102' || msg.from.id == '383063938'):
        admin(bot, msg)
    break
    default:
    break
}
}