const User    = require('../modules/user')
const admin   = require('./admin')
module.exports = (bot, msg) => {
  const id = msg.from.id
    switch (true) {
        case msg.text == '/start':
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
     const newUser = {
      id: msg.from.id,
      nickName:  nick
    }
User.findOne({id}).then((user) => {
  if (user) {
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
})

        break;
        case (msg.from.id == '280942102' || msg.from.id == '383063938'):
        admin(bot, msg)
        break;
        case msg.text == 'معلوماتي':
         {
            bot.sendMessage(' Name : ',msg.from.first_name ,'\n\nID : ', msg.from.id );
        };
        /*
        bot.onText(/خالة قولي (.+)/, (msg, match) => {
          const chatId = msg.chat.id;
          const resp = match[1]; 
        
          bot.sendMessage(chatId, resp);
        });
        */
       break;
        default:
            break;
    }
}
