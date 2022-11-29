import WebSocket from "WebSocket";

let ws = new WebSocket("ws://localhost:8080");

ws.onMessage = (msg) => {
  print("Message: " + msg);
}

ws.onError = (exception) => {
    print("Error: " + exception);
}

ws.onOpen = () => {
    print("Socket Opened");
    ws.send("/pc test");
}

ws.onClose = () => {
    print("Socket Closed");
}

ws.connect();
register('messageSent', (message, event) => {
    if (!message.startsWith("/") || message.startsWith("/pc") || message.startsWith("/gc" || message.startsWith("/msg"))){
        cancel(event)
        ws.send(message)
    } else if(message.startsWith("/runcommand ")){
        cancel(event)
        ws.send(message.replace("/runcommand ", "/"))
    }
});
