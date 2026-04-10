import { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  const clientRef = useRef(null);

  const keyword = window.location.pathname.split("/")[2];
  const name = window.location.pathname.split("/")[3];

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws/chat", // 🔥 direct websocket
      reconnectDelay: 5000,

      onConnect: () => {
        console.log("Connected ✅");

        client.subscribe(`/topic/room/${keyword}`, (message) => {
          const newMsg = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMsg]);
        });
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [keyword]);

  const sendMessage = () => {
    clientRef.current.publish({
      destination: `/app/chat/${keyword}`,
      body: JSON.stringify({
        sender: name,
        content: msg,
        type: "CHAT",
      }),
    });

    setMsg("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Room: {keyword}</h2>

      <div style={{ border: "1px solid gray", minHeight: "200px", padding: "10px" }}>
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.sender}:</b> {m.content}
          </p>
        ))}
      </div>

      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}