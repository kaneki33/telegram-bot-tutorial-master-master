const User     = require('../models/user')
module.exports = async (bot, msg) => {
const id = msg.from.id

switch (true) {
  case msg.text == '/start':
   const user = await User.findOne({id}).catch(err => false)
   if (!user) {
    bot.sendMessage(msg.chat.id, `مرحبا 😍\nرجاءا ارسل لي لقبك\nمثال:\nلقبي فلان`)
   } else {
       bot.sendMessage(msg.chat.id, `مرحبا يا ${user.nickName}`)
   }
  break
  case text == 'معلوماتي' :
    const usere = await User.findOne({id}).catch(err => false)
    if (!usere) {
      bot.sendMessage(msg.chat.id, ` Name :  ${msg.from.first_name} \n\nID :${msg.from.id}\n\nNick Name : No Nick Name`)
      bot.sendMessage(msg.chat.id, `مرحبا 😍\nرجاءا ارسل لي لقبك\nمثال:\nلقبي فلان`)
    } else {
      bot.sendMessage(msg.chat.id, ` Name :  ${msg.from.first_name} \n\nID :${msg.from.id}\n\nNick Name : ${user.nickName}`)
    }
    break
  case msg.text.startsWith('لقبي'):
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
      bot.sendMessage(msg.chat.id, `تم تحديث اللقب بنجاح يا ${nick} 😍`)
      })
    }else {
      const user = new User({
                    id: msg.from.id,
                   nickName:  nick
                  }).save(() => {
                  bot.sendMessage(msg.chat.id, `تم حفظ اللقب بنجاح يا ${nick} 😍`)
                })
    }
  break

    default:
    break
    }
}

