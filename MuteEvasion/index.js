import WebSocket from "WebSocket";
import Settings from "./config"


let ws = new WebSocket(`ws://${Settings.host}:${Settings.port}`);

let connected = false
let unload = false

function chat(message){
    ChatLib.chat("&dMute Evade >>&f " + message)
}

ws.onMessage = (msg) => {
    msg = JSON.parse(msg)
    if (msg.method == "message"){
        console.log(msg.data)
        chat(msg.data)
    }
}

ws.onError = (exception) => { print("Error: " + exception); }

ws.onOpen = () => { 
    console.log("Socket Opened");
    chat("Connection established with the websocket.")
    ws.send(JSON.stringify({method: "username", data: Player.getName()}))

}

// This barely works. It might not work at all :/
ws.onClose = () => {
    if (Settings.enabled){
        connected = false
        if(!connected && !unload){
            chat("There has been a connection issue with the websocket. Attempting to reconnect.")
        } else if (unload){
            return
        }
        else {
            return chat("Reconnect Failed. Try reloading with /ct reload")
        }
        connected = true
        setTimeout(() => ws.reconnect(), 5000)
    }
}

if(Settings.enabled){
    ws.connect();
}
// Parsing messages sent from the client and sending them to the server
register('messageSent', (message, event) => {
    if ((!message.startsWith("/") || message.startsWith("/pc") || message.startsWith("/gc") || message.startsWith("/msg") || message.startsWith("/r")) && Settings.enabled) {
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
        chat("MuteEvasion Commands: \n /muev testconnection - Test the connection to the websocket server. \n /muev rc - Send a message to the server as if it was sent from the client.\n /muev settings - Open the settings GUI. \n /muev setUsername - Lets the other client know what your username is. \n /muev help - Show this message.")
    }
    if(args[0] == "setusername"){
        ws.send(JSON.stringify({method: "configUpdate", data: {username: Player.getName()}}))
    }
    else {
        chat("Invalid Command. Try /muev help")
    }
}).setName("muev").setTabCompletions(["help", "rc", "testconnection", "settings", "setUsername"])

register("gameunload", () => {
    unload = true
    ws.close()
    chat("Disconnected from the websocket server.")
})