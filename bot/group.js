const Reply = require('../modules/reply')
module.exports = async (bot, msg) => {
    console.log("bing")
    const reply = await Reply.findOne({ ask: msg.text })
    console.log(reply)
    if(reply) {
   bot.sendMessage(msg.chat.id, reply.rep, { reply_to_message_id: msg.message_id})
    }
}
bot.onText('معلوماتي', (msg) => {
    const chatId = msg.chat.id;
  
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(' Name : ',msg.from.first_name ,'\n\nID : ', msg.from.id );
  });
  bot.onText(/خالة قولي (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1]; 
  
    bot.sendMessage(chatId, resp);
  });