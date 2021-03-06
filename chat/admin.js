const Reply = require('../models/reply')
module.exports = (bot, msg) => {
  const text = String(msg.text) || ""
switch (true) {
    case text.startsWith('Rep'):
        try {
          const matches = text.match(/Rep(\s+)(.+)(\s+)-(\s+)(.+)/)
          new Reply({
              ask: matches[2],
              rep: matches[5]
          }).save(() => {
            bot.sendMessage(msg.chat.id, "Added Successfully!", {
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
        case text.startsWith('Del'):
        try {
          const matches = text.match(/Del(\s+)(.+)/)
          const ask = matches[2]
          Reply.findOneAndRemove({ask}).then((success) => {
            if (success) {
                bot.sendMessage(msg.chat.id, 'Successfully Deleted!')
            }else {
                bot.sendMessage(msg.chat.id, 'Not Found!!')
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
         case text.startsWith('Edit'):
         try {
          const matches = text.match(/Edit(\s+)(.+)(\s+)-(\s+)(.+)/)
          Reply.findOne({ask: matches[2]}).then((reply) => {
            if(reply) {
            Reply.findOneAndUpdate({ask: reply.ask}, {$set: {rep: matches[5]}}).then(() => {
            bot.sendMessage(msg.chat.id, 'Successfully Edited!')
            })
            }else {
            bot.sendMessage(msg.chat.id, 'Not found!!')
            }
            })
        } catch (e) {
          const error = `
      الرجاء كتابة الامر بالصيغة الصحيحة
      مثال:
      Edit الكلمة - الرد
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
