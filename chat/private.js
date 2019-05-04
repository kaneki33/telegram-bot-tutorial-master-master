const User     = require('../models/user')
module.exports = async (bot, msg) => {
const id = msg.from.id

switch (true) {
  case msg.text == '/start':
   const user = await User.findOne({id}).catch(err => false)
   if (!user) {
    bot.sendMessage(msg.chat.id, `‌‌‎Hello there🤗🤗, please enter your Nick name....
        👉This way (  Nick X   ) WITHOUT THE BRACKETS.👈 
        ("X" is your Nickname)
        ‼️This is an irreversible action‼️
        So please choose well. 
        Thank you😊😊`)
   } else {
       bot.sendMessage(msg.chat.id, `Hey ${user.nickName}`)
   }
  break
  case msg.text.startsWith('Nick'):
    let message = msg.text.split(" ")
        message.splice(0 , 1)
    const nick = message.join(" ")
    const newUser = {
      id: msg.from.id,
      nickName:  nick
      }
    const fUser = await User.findOne({id}).catch(err => false)
    if (fUser) {
      User.findOneAndUpdate({id}, newUser).then(() => {
      bot.sendMessage(msg.chat.id, `Successfully updated ${nick} 😍`)
      })
    }else {
      const user = new User({
                    id: msg.from.id,
                   nickName:  nick
                  }).save(() => {
                  bot.sendMessage(msg.chat.id, `Successfully saved ... welcome ${nick} 😍`)
                })
    }
  break

    default:
    break
    }
}

