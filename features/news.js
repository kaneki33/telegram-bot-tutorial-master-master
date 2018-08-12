const rp      = require('request-promise')
const options = {
    uri: `https://newsapi.org/v2/top-headlines?sources=google-news-sa&apiKey=${process.env.NEWS_KEY}`,
    json: true
}
module.exports = (bot, msg) => {
rp(options).then((result) => {
    const article = result.articles[Math.floor(Math.random() * 10)]
    const body = `
*${article.title}*
بقلم: ${article.author || 'غير معروف'}
${article.description}

_${article.publishedAt}_   
`
    bot.sendPhoto(msg.chat.id, article.urlToImage).then((msg) => {
        bot.sendMessage(msg.chat.id, body, {
            parse_mode: 'markdown',
            reply_to_message_id: msg.message_id,
            disable_web_page_preview: true,
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: 'رابط الخبر', url: article.url}
                    ]
                ]
            }
        })
    })
}).catch((err) => {
    throw err
})
}