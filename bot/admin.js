const Reply = require('../modules/reply')
module.exports = (bot, msg) => {
switch (true) {
    case msg.text.startsWith('rep'):
        try {
          const matches = msg.text.match(/rep(\s+)(.+)(\s+)-(\s+)(.+)/)
          new Reply({
              ask: matches[2],
              rep: matches[5]
          }).save(() => {
            bot.sendMessage(msg.chat.id, "تمت اضافة الرد بنجاح", {
                reply_to_message_id: msg.message_id
              })
          })
        } catch (e) {
          const error = `
      الرجاء كتابة الامر بالصيغة الصحيحة
      مثال:
      rep الكلمة - الرد
              `
          bot.sendMessage(msg.chat.id, error, {
            reply_to_message_id: msg.message_id
          })
        }
        break
    default:
        break
}
}