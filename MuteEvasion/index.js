import WebSocket from "WebSocket";

let ws = new WebSocket("ws://localhost:8080");

let connected = false

ws.onMessage = (msg) => { print("Message: " + msg); }

ws.onError = (exception) => { print("Error: " + exception); }

ws.onOpen = () => { print("Socket Opened");}

// This barely works. 
ws.onClose = () => {
    connected = false
    if(!connected){
        ChatLib.chat("&d Mute Evade >>&f There has been a connection issue with the websocket. Attempting to reconnect.")
    } else {
        return ChatLib.chat("&d Mute Evade >>&f Reconnect Failed. Try reloading with /ct reload")
    }
    connected = true
    setTimeout(() => ws.reconnect(), 5000)
}

ws.connect();

// Parsing messages sent from the client and sending them to the server
register('messageSent', (message, event) => {
    if (!message.startsWith("/") || message.startsWith("/pc") || message.startsWith("/gc") || message.startsWith("/msg")) {
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
        ws.send(JSON.stringify({method: "message", data: args.join(" ").replace(rc, "/")}))
    }
}).setName("muev").setTabCompletions(["rc", "testconnection"])