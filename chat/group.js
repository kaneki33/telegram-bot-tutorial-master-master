const Reply = require('../modules/reply')
module.exports = async (bot, msg) => {
    const reply = await Reply.findOne({ ask: msg.text })
    const user = await User.findOne({id}).catch(err => false)
    if(reply) {
        if(reply.ask == "حجة" && msg.from.id == "383063938") {

            bot.sendMessage(msg.chat.id,`عيون الحجة 😍 `, {
                reply_to_message_id: msg.message_id
              })            }
              
                  else if(reply.ask == "مين انا يا حجة؟" && msg.from.id == "383063938") {

                    bot.sendMessage(msg.chat.id,`انت ${user.nickName} .. وكمان عزووووز الطيب 😍😍`, {
                        reply_to_message_id: msg.message_id
                      })            }
            else {
                bot.sendMessage(msg.chat.id, reply.rep)

            
            }
    }

}