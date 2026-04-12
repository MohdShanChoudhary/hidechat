import { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const clientRef = useRef(null);
  const bottomRef = useRef(null);

  const keyword = window.location.pathname.split("/")[2];
  const name = window.location.pathname.split("/")[3];

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    if (isNaN(date)) return "";
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const client = new Client({
      brokerURL: "wss://hidechat-1nub.onrender.com/ws/chat", // ✅ correct
      reconnectDelay: 5000,

      onConnect: () => {
        console.log("Connected ✅");

        client.subscribe(`/topic/room/${keyword}`, (message) => {
          const newMsg = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMsg]);
        });
      },

      onStompError: (frame) => {
        console.error("WebSocket error:", frame);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => client.deactivate();
  }, [keyword]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const sendMessage = () => {
    if (!msg.trim()) return;

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
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>Room: {keyword}</h2>

      <div style={{
        height: "400px",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "10px"
      }}>
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.sender}</b>: {m.content}
            <span style={{ fontSize: "10px", marginLeft: "5px" }}>
              {formatTime(m.timestamp)}
            </span>
          </p>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type message..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}