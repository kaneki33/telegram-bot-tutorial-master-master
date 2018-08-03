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

const AnimationUrl1 = 'https://media.giphy.com/media/ya4eevXU490Iw/giphy.gif'
const AnimationUrl2 = 'https://media.giphy.com/media/LrmU6jXIjwziE/giphy.gif'



bot.command('local', (ctx) => ctx.replyWithPhoto({ source: '/cats/cat1.jpeg' }))
bot.command('stream', (ctx) => ctx.replyWithPhoto({ source: fs.createReadStream('/cats/cat2.jpeg') }))
bot.command('buffer', (ctx) => ctx.replyWithPhoto({ source: fs.readFileSync('/cats/cat3.jpeg') }))
bot.command('pipe', (ctx) => ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' }))
bot.command('url', (ctx) => ctx.replyWithPhoto('https://picsum.photos/200/300/?random'))
bot.command('animation', (ctx) => ctx.replyWithAnimation(AnimationUrl1))
bot.command('pipe_animation', (ctx) => ctx.replyWithAnimation({ url: AnimationUrl1 }))

bot.command('caption', (ctx) => ctx.replyWithPhoto('https://picsum.photos/200/300/?random', {
  caption: 'Caption *text*',
  parse_mode: 'Markdown'
}))

bot.command('album', (ctx) => {
  ctx.replyWithMediaGroup([
    {
      'media': 'AgADBAADXME4GxQXZAc6zcjjVhXkE9FAuxkABAIQ3xv265UJKGYEAAEC',
      'caption': 'From file_id',
      'type': 'photo'
    },
    {
      'media': 'https://picsum.photos/200/500/',
      'caption': 'From URL',
      'type': 'photo'
    },
    {
      'media': { url: 'https://picsum.photos/200/300/?random' },
      'caption': 'Piped from URL',
      'type': 'photo'
    },
    {
      'media': { source: '/cats/cat1.jpeg' },
      'caption': 'From file',
      'type': 'photo'
    },
    {
      'media': { source: fs.createReadStream('/cats/cat2.jpeg') },
      'caption': 'From stream',
      'type': 'photo'
    },
    {
      'media': { source: fs.readFileSync('/cats/cat3.jpeg') },
      'caption': 'From buffer',
      'type': 'photo'
    }
  ])
})

bot.command('edit_media', (ctx) => ctx.replyWithAnimation(AnimationUrl1, Extra.markup((m) =>
  m.inlineKeyboard([
    m.callbackButton('Change media', 'swap_media')
  ])
)))

bot.action('swap_media', (ctx) => ctx.editMessageMedia({
  type: 'animation',
  media: AnimationUrl2
}))

bot.startPolling()


bot.command('start', (ctx) => {
  return ctx.reply(`welcome  ${ctx.from.first_name}! .. thats a nice name`, Markup
  .keyboard([
    ['/caption'], // Row0 with 1  buttons
      [' /custom ', '/onetime'], // Row1 with 2 buttons
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
      [' /custom ', '/onetime'], // Row1 with 2 buttons
      ['/special', '/pyramid'], // Row2 with 2 buttons
      ['/simple', '/random', '/inline'] // Row3 with 3 buttons
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
        
    

   


*/
   //const  OtherwiseController = require('./controllers/otherwise');
//bot.router.otherwise(new OtherwiseController());

function exitHandler(exitCode) {
    storage.flush();
    process.exit(exitCode);
}

process.on('SIGINT', exitHandler.bind(null, 0));
process.on('uncaughtException', exitHandler.bind(null, 1));

bot.telegram.setWebhook("https://serene-beyond-78420.herokuapp.com/" + token);

bot.startWebhook('/'+token, null, process.env.PORT);
