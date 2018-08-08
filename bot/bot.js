const token   = process.env.TOKEN
const Bot     = require('node-telegram-bot-api')
const private = require('./private')
const group   = require('./group')
let bot

if (process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token)
} else {
  bot = new Bot(token, {
    polling: true
  })
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode')

bot.on('message', (msg) => {
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