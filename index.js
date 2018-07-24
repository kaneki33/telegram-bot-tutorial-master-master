'use strict';
//
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

bot.command('start', (ctx) => {
  return ctx.reply(`welcome  ${ctx.from.first_name}! .. thats a nice name`, Markup
  .keyboard([
    ['Caption'], // Row0 with 1  buttons
    [' Custom ', 'Onetime'], // Row1 with 2 buttons
    ['Special', 'Pyramid'], // Row2 with 2 buttons
    ['Simple', 'Random', 'Inline'] // Row3 with 3 buttons
  ])
  .oneTime()
  .resize()
  .extra()
)
})
bot.command('Menu', ({ reply }) => {
  return reply('Custom buttons keyboard', Markup
    .keyboard([
      ['Caption'], // Row0 with 1  buttons
      [' Custom ', 'Onetime'], // Row1 with 2 buttons
      ['Special', 'Pyramid'], // Row2 with 2 buttons
      ['Simple', 'Random', 'Inline'] // Row3 with 3 buttons
    ])
    .oneTime()
    .resize()
    .extra()
  )
})

    bot.hears(['hi', 'Hi'] ,  (ctx) => {
  return ctx.reply(`وش تبي  `)
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
    
    bot.hears('Custom', ({ reply }) => {
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
    
    bot.hears('Special', (ctx) => {
      return ctx.reply('Special buttons keyboard', Extra.markup((markup) => {
        return markup.resize()
          .keyboard([
            markup.contactRequestButton('Send contact'),
            markup.locationRequestButton('Send location')
          ])
      }))
    })
    
    bot.hears('Pyramid', (ctx) => {
      return ctx.reply('Keyboard wrap', Extra.markup(
        Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
          wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
        })
      ))
    })
    
    bot.hears('Simple', (ctx) => {
      return ctx.replyWithHTML('<b>Coke</b> or <i>Pepsi?</i>', Extra.markup(
        Markup.keyboard(['👥 Share\n /inline', 'Pepsi'])
      ))
    })
    
    bot.hears('Inline', (ctx) => {
      return ctx.reply('<b>Choose your Anonymity settings?</b>', Extra.HTML().markup((m) =>
        m.inlineKeyboard([
          m.callbackButton('Keep me anonymous', 'You are hidden'),
          m.callbackButton('show who I am', 'you are shown')
        ])))
    })
    
    bot.hears('Random', (ctx) => {
      return ctx.reply('random example',
        Markup.inlineKeyboard([
          Markup.callbackButton('Coke', 'Coke'),
          Markup.callbackButton('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
          Markup.callbackButton('Pepsi', 'Pepsi')
        ]).extra()
      )
    })
    
    bot.hears('Caption', (ctx) => {
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
    
    bot.action('plain', async (ctx) => {
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
    
    


bot.on('text', (ctx) => {
  ctx.telegram.sendMessage(ctx.message.chat.id, `GO TO HELL!!!!!`) })





  const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM test_table');
    res.render('pages/db', result);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});
    bot.startPolling()
        
    

   



   //const  OtherwiseController = require('./controllers/otherwise');
//bot.router.otherwise(new OtherwiseController());

function exitHandler(exitCode) {
    storage.flush();
    process.exit(exitCode);
}

process.on('SIGINT', exitHandler.bind(null, 0));
process.on('uncaughtException', exitHandler.bind(null, 1));