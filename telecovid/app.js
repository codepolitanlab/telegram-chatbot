const { Telegraf } = require('telegraf')
const axios = require('axios')
const dateFormat = require('dateformat')

const bot = new Telegraf('1554146047:AAE0iRGlcSw-bcwEmJvD5_LjCdU81J2Qi9M')

bot.start((ctx) => {
    let message = `Hi ${ctx.from.first_name}, Selamat data di bot informasi Covid19`
    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Indonesia 🇮🇩', callback_data: 'indonesia'}],
                [{ text: 'Wolrd 🌏', callback_data: 'world'}],
            ]
        }
    });
})

bot.action('indonesia', (ctx) => {
    ctx.answerCbQuery('button clicked')
    let getData = async() => {
        try {
            const res = await axios.get(`https://disease.sh/v3/covid-19/countries/Indonesia`)
            // console.log(res.data)
            let date = dateFormat(res.data.updated, "dddd, d mmmm yyyy, h:MM:ss TT")
            let cases = res.data.cases
            let todayCase = res.data.todayCases
            let totalActive = res.data.active
            let todayRecovered = res.data.todayRecovered
            let totalRecovered = res.data.recovered
            let todayDeath = res.data.todayDeaths
            let totalDeath = res.data.deaths
            
            let table = `
Status Covid-19 di Indonesia
Tertanggal: ${date}

<pre>
+----------------------------------+
| Total Cases   |   ${cases}    |
+----------------------------------+
| Today Cases       | ${todayCase}  |
+-----------------------------------+
| Total Active      | ${totalActive}|
+-----------------------------------+
| Today Recovered   | ${todayRecovered}|
+-----------------------------------+
| Total Recovered   | ${totalRecovered}|
+-----------------------------------+
| Today Death   | ${todayDeath}|
+-----------------------------------+
| Total Death   | ${totalDeath}|
+-----------------------------------+
</pre>
            `

            bot.telegram.sendMessage(ctx.chat.id, table, {
                parse_mode: 'HTML'
            });
        } catch (error) {
            console.error('error ' + error)
        }
    }

    getData();
})

bot.action('world', (ctx) => {
    ctx.answerCbQuery('button clicked')
    let getData = async() => {
        try {
            const res = await axios.get(`https://disease.sh/v3/covid-19/countries/indonesia`)
            console.log(res.data)
            let date = dateFormat(res.data.updated, "dddd, d mmmm yyyy, h:MM:ss TT")
            let cases = res.data.cases
            let todayCase = res.data.todayCases
            let totalActive = res.data.active
            let todayRecovered = res.data.todayRecovered
            let totalRecovered = res.data.recovered
            let todayDeath = res.data.todayDeaths
            let totalDeath = res.data.deaths
            
            let table = `
Status Covid-19 di Seluruh Dunia
Tertanggal: ${date}

<pre>
+----------------------------------+
| Total Cases   |   ${cases}    |
+----------------------------------+
| Today Cases       | ${todayCase}  |
+-----------------------------------+
| Total Active      | ${totalActive}|
+-----------------------------------+
| Today Recovered   | ${todayRecovered}|
+-----------------------------------+
| Total Recovered   | ${totalRecovered}|
+-----------------------------------+
| Today Death   | ${todayDeath}|
+-----------------------------------+
| Total Death   | ${totalDeath}|
+-----------------------------------+
</pre>
            `

            bot.telegram.sendMessage(ctx.chat.id, table, {
                parse_mode: 'HTML'
            });
        } catch (error) {
            console.error('error ' + error)
        }
    }

    getData();
})

bot.launch();