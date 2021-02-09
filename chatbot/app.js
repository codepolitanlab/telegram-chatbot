const { Telegraf } = require('telegraf')
const axios = require('axios')

const bot = new Telegraf('1554146047:AAE0iRGlcSw-bcwEmJvD5_LjCdU81J2Qi9M')

bot.start((ctx) => ctx.reply('Welcome'))

bot.hears('hi', (ctx) => ctx.reply('Hello'))

bot.command('course', function(ctx) {
    axios
        .get(`https://api.codepolitan.com/course`)
        .then(res => {
            const data = res.data
            const limitData = data.slice(0, 9)

            limitData.forEach(element => {
                ctx.reply(`
                    *${element.title}*
                    [Link](https://apps.codepolitan.com/courses/detail/${element.slug})
                `, {
                    parse_mode: 'MarkdownV2'
                })
            });
        }).catch(err => console.log(err))
})

bot.launch();