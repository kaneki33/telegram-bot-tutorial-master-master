const User    = require('../modules/user')
const admin   = require('./admin')
module.exports = (bot, msg) => {
    switch (true) {
        case msg.text == '/start':
        const id = msg.from.id
        User.findOne({id}).then((user) => {
          if (!user) {
            bot.sendMessage(msg.chat.id, `مرحبا 😊
رجاءا ارسل لي لقبك
مثال:
لقبي فلان
      `)
          } else {
            bot.sendMessage(msg.chat.id, `مرحبا بك  ${user.nickName}`).then((msg) => {})
          }
        }).catch((err) => {
          console.log(err)
        })
            break;
        case msg.text.startsWith('لقبي'):
        let message = msg.text.split(" ")
        message.splice(0 , 1)
     const nick = message.join(" ")
     const user = new User({
       id: msg.from.id,
       nickName:  nick
     }).save(() => {

       bot.sendMessage(msg.chat.id, `تم حفظ اللقب بنجاح يا ${nick} 😍`)

     })
        break;
        case (msg.from.id == '280942102' || msg.from.id == '383063938'):
        admin(bot, msg)
        break
        default:
            break;
    }
}