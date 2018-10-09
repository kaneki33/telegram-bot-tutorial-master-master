const token   = process.env.TOKEN
const Bot     = require('node-telegram-bot-api')
const private = require('./chat/private')
const group   = require('./chat/group')
const general = require('./chat/general')
let bot

if (process.env.NODE_ENV === 'production') {
  bot = new Bot(token)
  bot.setWebHook(process.env.HEROKU_URL + bot.token)
} else {
bot = new Bot(token, {
  polling: true
})
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode')
bot.sendMessage(383063938,"The bot is online")
bot.onText(/\/Send(\s+)(.+)(\s+)-(\s+)(.+)/, (msg, matcch) => {
    const naame = matcch[2];
    const mssg = matcch[5];
    if(naame = ken)
    
      bot.sendMessage(383063938,mssg)
    
    else if(naame = Ken)

      bot.sendMessage(383063938,mssg);
      
    else if(naame = khal)
    
      bot.sendMessage(614264651,mssg)
    
    else if(naame = Li)
    
      bot.sendMessage(236655199,mssg)
    
    else 
    {
      bot.sendMessage(msg.chat.id,mssg)
    }
  });
bot.on('message', (msg) => {
 general(bot, msg)
  switch (true) {
    case (msg.chat.type == 'private'):
      private(bot, msg)
      break
    case (msg.chat.type == 'group' || msg.chat.type == 'supergroup'):
      group(bot, msg)
    default:
      break
  }
});

module.exports = bot