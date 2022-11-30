import WebSocket from "WebSocket";
import Settings from "./config"


let ws = new WebSocket(`ws://${Settings.host}:${Settings.port}`);

let connected = false

function chat(message){
    ChatLib.chat("&d Mute Evade >>&f " + message)
}

ws.onMessage = (msg) => { 
    msg = JSON.parse(msg)
    if (msg.method == "message"){
        chat(msg.data)
    }
}

ws.onError = (exception) => { print("Error: " + exception); }

ws.onOpen = () => { print("Socket Opened");}

// This barely works. 
ws.onClose = () => {
    connected = false
    if(!connected){
        chat("There has been a connection issue with the websocket. Attempting to reconnect.")
    } else {
        return chat("Reconnect Failed. Try reloading with /ct reload")
    }
    connected = true
    setTimeout(() => ws.reconnect(), 5000)
}

ws.connect();

// Parsing messages sent from the client and sending them to the server
register('messageSent', (message, event) => {
    if (!message.startsWith("/") || message.startsWith("/pc") || message.startsWith("/gc") || message.startsWith("/msg") && Settings.enabled) {
        cancel(event)
        ws.send(JSON.stringify({ method: "message", data: message }))
    }
});

register("command", (...args) =>{
    if(args[0] == "testconnection"){
        ws.send(JSON.stringify({ method: "testConnection" }))
    }
    if (args[0] == "rc"){
        console.log(args)
        ws.send(JSON.stringify({method: "message", data: args.join(" ").replace("rc ", "/")}))
    }
    if (args[0] == "settings"){
        Settings.openGUI();
    }
    if (args[0] == "help"){
        chat("MuteEvasion Commands: \n /testconnection - Test the connection to the websocket server. \n /rc - Send a message to the server as if it was sent from the client.\n /settings - Open the settings GUI. \n /help - Show this message.")
    }

    if(!args){
        chat("Invalid Command. Try /muev help")
    }
}).setName("muev").setTabCompletions(["help", "rc", "testconnection", "settings"])