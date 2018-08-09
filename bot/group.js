const Reply = require('../modules/reply')
module.exports = async (bot, msg) => {
    console.log("bing")
    const reply = await Reply.findOne({ ask: msg.text })
    console.log(reply)
    if(reply) {
   bot.sendMessage(msg.chat.id, reply.rep, { reply_to_message_id: msg.message_id})
    }
    switch (true) {
        case msg.text == 'معلوماتي':
           {
            bot.sendMessage(msg.chat.id, ` Name :  ${msg.from.first_name} \n\nID :${msg.from.id}`)
  
          };
          break;
          default:
          break;
  }
}