require('dotenv').config();
const mineflayer = require('mineflayer')

const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: process.env.PORT })

const bot = mineflayer.createBot({
    viewDistance: 'tiny',
    version: '1.17.1',
    defaultChatPatterns: false,
    host: 'mc.hypixel.io',
    username: process.env.ACCOUNT_NAME,
    auth: process.env.AUTH
})
let username = ""

// This is awful dont even like try and look at it. I'll add some actually intelligent things to it another time.
wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    data = JSON.parse(data)
    if (data.method == "testConnection"){
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({method: "message", data: "Connection Successful"}));
            console.log("Connection Successful")
        }
    });
    }
    if (data.method == "message"){
      bot.chat(`${data.data}`)
    }
    if (data.method == "username"){
      username = data.data
    }
  });
});

bot.on('message', (message, jsonMsg) => {
    console.log(message.toAnsi())
    if (message.toString().includes(`${username} has invited you to join their party!`)){
      bot.chat(`/p join ${username}`)
    } 
    if (message.toString().startsWith("From ") || message.toString().startsWith("To ")){
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                console.log("Sending message")
                client.send(JSON.stringify({method: "message", data: message.toMotd().toString().replace(/§/g, "&")}));
            }
        });
    }
})

bot.on("login", () => {
  bot.chat("§")
})

bot.on('kicked', console.log)
bot.on('error', console.log)