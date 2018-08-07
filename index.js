'use strict';
//
var fs = require('fs'); 
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup'),
    PersistentMemoryStorage = require('./adapters/PersistentMemoryStorage'),
    storage = new PersistentMemoryStorage(
        `${__dirname}/data/userStorage.json`,
        `${__dirname}/data/chatStorage.json`
    ),
   

    
 token = '497990783:AAHe42KNeF-A7KnJYJmOLXC7zyDsuA_Uq5Q';
 

const bot = new Telegraf(token,
    {
    polling: true,
    });
//start
bot.use(Telegraf.log())
function addnick(userId) {
  
fs.writeFileSync(__dirname + 'nicknames.json', 'utf8')
var nick = fs.readFileSync(dirname + '/nicknames.json')

 nick.nicknames[userId] = name

 fs.writeFileSync(dirname + '/nicknames.json', nick)
 console.log('added a nickname')
 
}


bot.command('start', (ctx) => {
  return ctx.reply(`welcome \nPlease enter the nick-name you want to be called \n\n Notice: Its an irreversible action so please choose well`
//, addnick(ctx.from.id) 

)})

// Include prompt module.
var prompt = require('prompt');

// This json object is used to configure what data will be retrieved from command line.
var prompt_attributes = [
    {
        // The fist input text is assigned to username variable.
        name: 'username',
        // The username must match below regular expression.
        validator: /^[a-zA-Z\s\-]+$/,
        // If username is not valid then prompt below message.
        warning: 'Username is not valid, it can only contains letters, spaces, or dashes'
    },
    {
        // The second input text is assigned to password variable.
        name: 'password',
        // Do not show password when user input.
        hidden: true
    },
    {
        // The third input text is assigned to email variable.
        name: 'email',
        // Display email address when user input.
        hidden: false
    }
];

// Start the prompt to read user input.
prompt.start();

// Prompt and get user input then display those data in console.
prompt.get(prompt_attributes, function (err, result) {
    if (err) {
        console.log(err);
        return 1;
    }else {
        console.log('Command-line received data:');

        // Get user input from result object.
        var username = result.username;
        var password = result.password;
        var email = result.email;
        var message = "  Username : " + username + " , Password : " + password + " , Email : " + email;

        // Display user input in console log.
        console.log(message);
    }
});
//END

bot.command('Menu', ({ reply }) => {
  return reply('Custom buttons keyboard', Markup
    .keyboard([
      ['/caption'], // Row0 with 1  buttons
      [' /Custom ', 'Onetime'], // Row1 with 2 buttons
      ['/special', '/pyramid'], // Row2 with 2 buttons
      ['/simple', '/random', '/inline'] // Row3 with 3 buttons
    ])
    .oneTime()
    .resize()
    .extra()
  )
})

    bot.hears(['hi', 'Hi'] ,  (ctx) => {
  return ctx.reply(`Hey there! `)
})

bot.hears(['bye', 'Bye'],  (ctx) => {
  return ctx.reply(`Please Don't come back ${ctx.from.first_name} `)
})
    


    
    
    bot.hears('Onetime', ({ reply }) =>
      reply('One time keyboard', Markup
        .keyboard(['/simple', '/inline', '/pyramid'])
        .oneTime()
        .resize()
        .extra()
      )
    )
    
    bot.command('Custom', ({ reply }) => {
      return reply('Custom buttons keyboard', Markup
        .keyboard([
          ['🔍 Search', '😎 Popular'], // Row1 with 2 buttons
          ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
          ['📢 Ads', '⭐️ Rate us', '👥 Share'] // Row3 with 3 buttons
        ])
        .oneTime()
        .resize()
        .extra()
      )
    })
    
    bot.hears('🔍 Search', ctx => ctx.reply('Yay!'))
    bot.hears('📢 Ads', ctx => ctx.reply('Free hugs. Call now!'))
    
    bot.command('special', (ctx) => {
      return ctx.reply('Special buttons keyboard', Extra.markup((markup) => {
        return markup.resize()
          .keyboard([
            markup.contactRequestButton('Send contact'),
            markup.locationRequestButton('Send location')
          ])
      }))
    })
    
    bot.command('pyramid', (ctx) => {
      return ctx.reply('Keyboard wrap', Extra.markup(
        Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
          wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
        })
      ))
    })
    
    bot.command('simple', (ctx) => {
      return ctx.replyWithHTML('<b>Coke</b> or <i>Pepsi?</i>', Extra.markup(
        Markup.keyboard(['👥 Share\n /inline', 'Pepsi'])
      ))
    })
    
    bot.command('inline', (ctx) => {
      return ctx.reply('<b>Choose your Anonymity settings?</b>', Extra.HTML().markup((m) =>
        m.inlineKeyboard([
          m.callbackButton('Keep me anonymous', 'You are hidden'),
          m.callbackButton('show who I am', 'you are shown')
        ])))
    })
    
    bot.command('random', (ctx) => {
      return ctx.reply('random example',
        Markup.inlineKeyboard([
          Markup.callbackButton('Coke', 'Coke'),
          Markup.callbackButton('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
          Markup.callbackButton('Pepsi', 'Pepsi')
        ]).extra()
      )
    })
    
    bot.command('caption', (ctx) => {
      return ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' },
        Extra.load({ caption: 'Caption' })
          .markdown()
          .markup((m) =>
            m.inlineKeyboard([
              m.callbackButton('Plain', 'plain'),
              m.callbackButton('Italic', 'italic')
            ])
          )
      )
    })
    
    bot.hears(/\/wrap (\d+)/, (ctx) => {
      return ctx.reply('Keyboard wrap', Extra.markup(
        Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
          columns: parseInt(ctx.match[1])
        })
      ))
    })
    
    bot.action('Dr Pepper', (ctx, next) => {
      return ctx.reply('👍').then(() => next())
    })
    
    
bot.on('text', (ctx) => {
  ctx.telegram.sendMessage(ctx.message.chat.id, `GO TO HELL!!!!!`) })
  
    /*bot.action('plain', async (ctx) => {
      ctx.editMessageCaption('Caption', Markup.inlineKeyboard([
        Markup.callbackButton('Plain', 'plain'),
        Markup.callbackButton('Italic', 'italic')
      ]))
    })
    
    bot.action('italic', (ctx) => {
      ctx.editMessageCaption('_Caption_', Extra.markdown().markup(Markup.inlineKeyboard([
        Markup.callbackButton('Plain', 'plain'),
        Markup.callbackButton('* Italic *', 'italic')
      ])))
    })
    
    bot.action(/.+/, (ctx) => {
      return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! ${ctx.from.first_name}`)
    })
  const  OtherwiseController = require('./controllers/otherwise');
  bot.router.otherwise(new OtherwiseController()); */

function exitHandler(exitCode) {
    storage.flush();
    process.exit(exitCode);
}

process.on('SIGINT', exitHandler.bind(null, 0));
process.on('uncaughtException', exitHandler.bind(null, 1));

bot.telegram.setWebhook("https://serene-beyond-78420.herokuapp.com/" + token);

bot.startWebhook('/'+token, null, process.env.PORT);
