const Reply = require('../modules/reply')
const User  = require('../modules/user')
const fs    = require('fs')
let obj
fs.readFileSync('../static/friends.json', 'utf8', (error, data) => {
if(err) throw err
obj = JSON.parse(data)
})
const obj   = JSON.parse(data)
module.exports = async (bot, msg) => {
// for testing
if (msg.text == 'testing') {
	for(let user of obj) {
	bot.sendMessage(msg.chat.id, user.name)
	}
}
//end testing
    const id = msg.from.id
    const user = await User.findOne({id}).catch(err => false)
    const reply = await Reply.findOne({ ask: msg.text })
    if(reply) {

                if(reply.ask == "حجة" && msg.from.id == "383063938") 
        {
            bot.sendMessage(msg.chat.id,`عيون الحجة 😍 `, { reply_to_message_id: msg.message_id})            
                      }   
 /* kaneki*/    else  if(reply.ask == "حجة مين انا" && msg.from.id == "383063938") 
              {
                  bot.sendMessage(msg.chat.id, `انت ${user.nickName} .. وكمان عزوووز مخترعي  😍😍`), {
                      reply_to_message_id: msg.message_id
                    } 
                      } 
 /*8asira*/     else if(reply.ask == "حجة مين انا" && msg.from.id == "481164937") 
              {
                  bot.sendMessage(msg.chat.id, `انت ${msg.from.first_name} .. وكمان القصيرة بس ام الكل 😍😍`), {
                      reply_to_message_id: msg.message_id
                    } 
                      }
 /*5al*/        else if(reply.ask == "حجة مين انا" && msg.from.id == "614264651") 
                  {
                      bot.sendMessage(msg.chat.id, `انت ${msg.from.first_name} .. وكمان الفلفل اسود حق الحارة 😍😍`), {
                          reply_to_message_id: msg.message_id
                        } 
                      }
  /*6ar8*/      else if(reply.ask == "حجة مين انا" && msg.from.id == "450493590") 
                  {
                      bot.sendMessage(msg.chat.id, `انت ${msg.from.first_name} .. طارق ملك المحبس 😍😍`), {
                          reply_to_message_id: msg.message_id
                        } 
                      }
   /*shakir*/   else if(reply.ask == "حجة مين انا" && msg.from.id == "280942102") 
                  {
                      bot.sendMessage(msg.chat.id, `انت ${msg.from.first_name} .. The greatest programer ever 😍😍`), {
                          reply_to_message_id: msg.message_id
                        } 
                      }
 /*Lee*/        else if(reply.ask == "حجة مين انا" && msg.from.id == "236655199") 
                  {
                    bot.sendMessage(msg.chat.id, `You are ${msg.from.first_name} .. or Welde Senbet 😍😍`), {
                        reply_to_message_id: msg.message_id
                      } 
                      }
                else {
                bot.sendMessage(msg.chat.id, reply.rep)

            
                      } 
                }
    
        }
