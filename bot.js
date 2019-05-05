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
 // polling: true
})
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode')
bot.sendMessage(737446966,"The bot is online")

bot.on('message', (msg) => {
  const text = String(msg.text) || ""
              bot.sendMessage(737446966, `${msg.from.first_name} said \n `+ text);
              bot.sendMessage(737446966, msg.from.id);
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
