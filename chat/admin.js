const Reply = require('../modules/reply')
module.exports = (bot, msg) => {
switch (true) {
    case msg.text.startsWith('Rep'):
        try {
          const matches = msg.text.match(/Rep(\s+)(.+)(\s+)-(\s+)(.+)/)
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
      Rep الكلمة - الرد
              `
          bot.sendMessage(msg.chat.id, error, {
            reply_to_message_id: msg.message_id
          })
        }
        break
        case msg.text.startsWith('Del'):
        try {
          const matches = msg.text.match(/Del(\s+)(.+)/)
          const ask = matches[2]
          Reply.findOneAndRemove({ask}).then((success) => {
            if (success) {
                bot.sendMessage(msg.chat.id, 'تم حذف الرد بنجاح')
            }else {
                bot.sendMessage(msg.chat.id, 'لم يتم العثور على الرد')
            }
          })
        } catch (e) {
          const error = `
      الرجاء كتابة الامر بالصيغة الصحيحة
      مثال:
      Del الرد المراد حذفه
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