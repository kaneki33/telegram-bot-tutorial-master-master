const Reply = require('../modules/reply')
const User  = require('../modules/user')
module.exports = async (bot, msg) => {
    const id = msg.from.id
    const reply = await Reply.findOne({ ask: msg.text })
    if(reply) {
        if(reply.ask == "حجة" && msg.from.id == "383063938") {

            bot.sendMessage(msg.chat.id,`عيون الحجة 😍 `, {
                reply_to_message_id: msg.message_id
              })            }
                 
           else if(reply.ask == "مين انا يا حجة؟" && msg.from.id == "383063938") 
              {
                  bot.sendMessage(msg.chat.id, `انت ${user.nickName} .. وكمان عزووووز الطيب 😍😍`), {
                      reply_to_message_id: msg.message_id
                    } 
                  } 
                 else if(reply.ask == "مين انا يا حجة؟" && msg.from.id == "481164937") 
              {
                  bot.sendMessage(msg.chat.id, `انت ${msg.from.first_name} .. وكمان القصيرة بس ام الكل 😍😍`), {
                      reply_to_message_id: msg.message_id
                    } 
                  }
                  else if(reply.ask == "مين انا يا حجة؟" && msg.from.id == "614264651") 
                  {
                      bot.sendMessage(msg.chat.id, `انت ${msg.from.first_name} .. وكمان الفلفل اسود حق الحارة 😍😍`), {
                          reply_to_message_id: msg.message_id
                        } 
                      }
                      else if(reply.ask == "مين انا يا حجة؟" && msg.from.id == "450493590") 
                  {
                      bot.sendMessage(msg.chat.id, `انت ${msg.from.first_name} .. طارق ملك المحبس 😍😍`), {
                          reply_to_message_id: msg.message_id
                        } 
                      }
            else {
                bot.sendMessage(msg.chat.id, reply.rep)

            
            }
    }
    
        }
