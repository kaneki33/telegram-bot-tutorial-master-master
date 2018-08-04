'use strict';

/*
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup'),
    PersistentMemoryStorage = require('./adapters/PersistentMemoryStorage'),
    storage = new PersistentMemoryStorage(
        `${__dirname}/data/userStorage.json`,
        `${__dirname}/data/chatStorage.json`
    ),
   
*/
    
 //token = '497990783:AAHe42KNeF-A7KnJYJmOLXC7zyDsuA_Uq5Q';
 var botgram = require("botgram");
var bot = botgram('497990783:AAHe42KNeF-A7KnJYJmOLXC7zyDsuA_Uq5Q');
bot.command("start", function (msg, reply, next) {
  console.log("Received a /start command from", msg.from.username);
});

bot.text(function (msg, reply, next) {
  console.log("Received a text message:", msg.text);
});

bot.contact(function (msg, reply, next) {
  console.log("User %s sent us a contact:", msg.from.firstname);
  console.log(" * Phone: %s", msg.phone);
  console.log(" * Name: %s %s", msg.firstname, msg.lastname);
  reply.text("Ok, got that contact.");
});

bot.video(function (msg, reply, next) {
  reply.text("That's a " + msg.width + "x" + msg.height + " video.");
});

bot.location(function (msg, reply, next) {
  reply.text("You seem to be at " + msg.latitude + ", " + msg.longitude);
});
bot.command("time", function (msg, reply, next) {
  reply.text("The current time is: " + Date());
});

bot.all(function (msg, reply, next) {
  if (msg.from.id === 5981248 || msg.from.id === 9824830)
    msg.hasPrivileges = true;
  next();
});

bot.command("time", function (msg, reply, next) {
  reply.text("The current time is: " + Date());
});

bot.command("quit", function (msg, reply, next) {
  if (!msg.hasPrivileges) {
    reply.text("Only some users can quit the bot.");
    return;
  }
  reply.text("Shutting down the bot.");
  process.exit(0);
});

bot.command("pwd", function (msg, reply, next) {
  reply.text("Bot is running from: " + require("path").resolve(__dirname));
});

bot.command("eval", function (msg, reply, next) {
  if (!msg.hasPrivileges) {
    reply.text("Did you SERIOUSLY thought I was going to evaluate code from strangers?");
    return;
  }
  var code = msg.args();
  try {
    reply.text("Result: " + eval(code).toString());
  } catch (e) {
    reply.text(e.toString());
  }
});
bot.contact(function (msg, reply, next) {
  console.log("User %s sent us a contact:", msg.from.firstname);
  console.log(" * Phone: %s", msg.phone);
  console.log(" * Name: %s %s", msg.firstname, msg.lastname);
  reply.text("Ok, got that contact.");
});
/*
const bot = new Telegraf(token,
    {
    polling: true,
    });
//start
bot.use(Telegraf.log())



bot.command('start', (ctx) => {
  return ctx.reply(`welcome  ${ctx.from.first_name}! .. thats a nice name`, Markup
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
