const Reply = require('../models/reply')
const User  = require('../models/user')
const fs    = require('fs')
const path  = require('path')
let friends
fs.readFile(path.resolve(__dirname, '../static/friends.json'), 'utf8', (err, data) => {
if(err) throw err
friends = JSON.parse(data)
})
module.exports = async (bot, msg) => {
    const id = msg.from.id
    let lock = true
    const reply = await Reply.findOne({ ask: msg.text })
    if(reply) {
       const target = friends.filter(friend => friend.id == id)
       if (target[0]) {
           for (const i in target[0].messages) {
            if (i == msg.text) {
                lock = false
                bot.sendMessage(msg.chat.id, target[0].messages[i], {parse_mode: 'markdown'})
            }
           }
       }
        if (lock) bot.sendMessage(msg.chat.id, reply.rep)  
       
                }

        }
