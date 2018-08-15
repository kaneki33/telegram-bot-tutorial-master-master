const admin   = require('./admin')
const news    = require('../features/news')
const lyric    = require('../features/lyrics')
const dict    = require('../features/dict')

module.exports = (bot, msg) => {
    const text = String(msg.text) || ""
switch (true) {
    case text.startsWith('Lyric'):
    const matches = text.match(/Lyric(\s+)(.+)(\s+)-(\s+)(.+)/)
    lyric.get(matches[2],matches[5], (err, lyrics) => {
    let res 
    if (err) {
        res = 'لم يتم العثور على الكلمات';
    }
    else
 {
    res = lyrics
}
    bot.sendMessage(msg.chat.id, res)
    console.log(err)
    })
        break 
    case text.startsWith('Difine'):
    const matches = text.match(/Difine(\s+)(.+)/)
    dict.get(matches[2], (err, getDef) => {
    
    bot.sendMessage(msg.chat.id, getDef)
    console.log(err)
    })
        break 
    case text == 'اخبار' :
    news(bot, msg)
    break
    case text == 'معلوماتي' :
    bot.sendMessage(msg.chat.id, ` Name :  ${msg.from.first_name} \n\nID :${msg.from.id}`)
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