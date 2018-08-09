const Reply = require('../modules/reply')
module.exports = async (bot, msg) => {
    console.log(msg)
    const reply = await Reply.findOne({ ask: msg.text })
    if(reply) {
   bot.sendMessage(msg.chat.id, reply.rep, { reply_to_message_id: msg.message_id})
    }
}