const admin   = require('./admin')
const news    = require('../features/news')
const lyric    = require('../features/lyrics')
const dict    = require('../features/dict')
//const dict    = require('../features/urban')
const ud = require('../urban-dictionary')
module.exports = (bot, msg) => {
    const text = String(msg.text) || ""
switch (true) {  
    case text.startsWith('/ud'):
var definition = 'car'
var id = 217456

// defid callback example.
ud.defid(id, (error, entry) => {
  if (error) {
    console.error(error.message)
  } else {
    bot.sendMessage(msg.chat.id,entry.word , '1')
    bot.sendMessage(msg.chat.id,entry.definition , ' 2')
    bot.sendMessage(msg.chat.id,entry.example , '3')
  }
})
// defid promise example.
ud.defid(id).then((result) => {
  bot.sendMessage(msg.chat.id,result.word , '4' )
  bot.sendMessage(msg.chat.id,result.definition , '5')
  bot.sendMessage(msg.chat.id,result.example , '6')
  bot.sendMessage(msg.chat.id, entry.word , '7')
}).catch((error) => {
  console.error(error.message)
})

// random callback example.
ud.random((error, entry) => {
  if (error) {
    console.error(error.message)
  } else {
    bot.sendMessage(msg.chat.id,entry.word , '8')
    bot.sendMessage(msg.chat.id,entry.definition , '9')
    bot.sendMessage(msg.chat.id,entry.example , '10')
    bot.sendMessage(msg.chat.id, 'random call')

  }
})

// random promise example.
ud.random().then((result) => {
  bot.sendMessage(msg.chat.id,result.word , '11')
  bot.sendMessage(msg.chat.id,result.definition , '12')
  bot.sendMessage(msg.chat.id,result.example , '13')
  bot.sendMessage(msg.chat.id, 'ran pro')

}).catch((error) => {
  console.error(error.message)
})

// term callback example.
ud.term(definition, (error, entries, tags, sounds) => {
  if (error) {
    console.error(error.message)
  } else {
    bot.sendMessage(msg.chat.id,entries[0].word , '14')
    bot.sendMessage(msg.chat.id,entries[0].definition , '15')
    bot.sendMessage(msg.chat.id,entries[0].example , '16')
    bot.sendMessage(msg.chat.id, 'term call')

  }
})

// term promise example.
ud.term(definition).then((result) => {
  const entries = result.entries
  bot.sendMessage(msg.chat.id,entries[0].word , '17')
  bot.sendMessage(msg.chat.id,entries[0].definition , '18')
  bot.sendMessage(msg.chat.id,entries[0].example , '19')
  bot.sendMessage(msg.chat.id, 'term pro')

}).catch((error) => {
  console.error(error.message)
})

    




        break 
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
    const matche = text.match(/Difine(\s+)(.+)/)
    dict.getDef(matche[2], null, function(getDef){
    
    bot.sendMessage(msg.chat.id, getDef)
    });
        break 
    case text == 'حجة اخبار' :
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