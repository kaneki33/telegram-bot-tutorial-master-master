const admin   = require('./admin')
const news    = require('../features/news')
const lyric    = require('../features/lyrics')
var l = require("lyric-get");

console.log(l.get("John Lennon", "Imagine"));
module.exports = (bot, msg) => {
    const text = String(msg.text) || ""
switch (true) {
    case text.startsWith('Lyric'):
    const matches = text.match(/Lyric(\s+)(.+)(\s+)-(\s+)(.+)/)
    lyric(matches[2],matches[5], (err, lyrics) => {
    const res
    if (err) res = 'لم يتم العثور على الكلمات';
    res = lyrics
    bot.sendMessage(msg.chat.id, res)
    })
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