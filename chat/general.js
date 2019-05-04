const admin   = require('./admin')
const news    = require('../features/news')
const lyric    = require('../features/lyrics')
const dict    = require('../features/dict')
const ud = require('../urban-dictionary')
const tex = require('../features/texts')
module.exports = (bot, msg) => {
    const text = String(msg.text) || ""

switch (true) {  

 case text.startsWith('/ud'):
 {
    const matce = text.match(/ud(\s+)(.+)/)
    const Word = matce[2]
    var definition = Word;
    var id = 217456

// defid callback example.
ud.defid(id, (error, entry) => {
  if (error) {
    console.error(error.message)
  } else {
    console.log(entry.word , '1')
    console.log(entry.definition , ' 2')
    console.log(entry.example , '3')
  }
})
// defid promise example.
ud.defid(id).then((result) => {
  console.log(result.word , '4' )
  console.log(result.definition , '5')
  console.log(result.example , '6')
  console.log( entry.word , '7')
}).catch((error) => {
  console.error(error.message)
})

// random callback example.
ud.random((error, entry) => {
  if (error) {
    console.error(error.message)
  } else {
    console.log(entry.word , '8')
    console.log(entry.definition , '9')
    console.log(entry.example , '10')
    console.log( 'random call')

  }
})

// random promise example.
ud.random().then((result) => {
  console.log(result.word , '11')
  console.log(result.definition , '12')
  console.log(result.example , '13')
  console.log( 'ran pro')

}).catch((error) => {
  console.error(error.message)
})

// term callback example.
ud.term(definition, (error, entries, tags, sounds) => {
  if (error) {
    console.error(error.message)
  } else {
    bot.sendMessage(msg.chat.id,entries[0].word )
    bot.sendMessage(msg.chat.id,entries[0].definition )
    bot.sendMessage(msg.chat.id,entries[0].example )
    console.log( 'term call')

  }
})

// term promise example.
ud.term(definition).then((result) => {
  const entries = result.entries
  console.log(entries[0].word , '17')
  console.log(entries[0].definition , '18')
  console.log(entries[0].example , '19')
  console.log( 'term pro')

}).catch((error) => {
  console.error(error.message)
})
        break 
}
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
    case text.startsWith('Send'):
    const matchess = text.match(/\/Send(\s+)(.+)(\s+)-(\s+)(.+)/)
    tex.get(matchess[2])
   const txx = tx
    bot.sendMessage(txx, matchess[5])
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
    case (msg.from.id == '280942102' || msg.from.id == '737446966'):
        admin(bot, msg)
    break
    default:
    break
}
}
