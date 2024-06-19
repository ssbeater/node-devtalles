import { WebSocketServer, WebSocket } from "ws";

const PORT = 3001;

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", function connection(ws) {
  console.log("Client connected");

  ws.on("error", console.error);

  ws.on("message", function message(data) {
    const payload = JSON.stringify({
      type: "custom-message",
      payload: data.toString(),
    });
    
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  });

  ws.on("close", function disconnected() {
    console.log("Client disconnected!");
  });
});

console.log(`Server started on port ${PORT}`);
