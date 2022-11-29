const mineflayer = require('mineflayer')

const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 })

const bot = mineflayer.createBot({
    viewDistance: 'tiny',
    version: '1.17.1',
    defaultChatPatterns: false,
    host: 'mc.hypixel.net', // minecraft server ip
    username: '', // minecraft username
    auth: 'microsoft' // only set if you need microsoft auth, then set this to 'microsoft'
})

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
    bot.chat(`${data}`)
  });
});

bot.on('message', (message) => {
    console.log(message.toAnsi())
    // wss.send()
})

// Log errors and kick reasons:
bot.on('kicked', console.log)
bot.on('error', console.log)