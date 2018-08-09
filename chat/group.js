const Reply = require('../modules/reply')
module.exports = async (bot, msg) => {
    const reply = await Reply.findOne({ ask: msg.text })
    if(reply) {
        if(reply.ask == "حجة" && msg.from.id == "383063938") {
            bot.sendMessage(msg.chat.id , "ي عيون حجة" )
            }else {
                bot.sendMessage(msg.chat.id, reply.rep, { reply_to_message_id: msg.message_id})

            
            }
    }

}