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
      brokerURL: "wss://hidechat-1nub.onrender.com/ws/chat", // ✅ FIX
      reconnectDelay: 5000,

      onConnect: () => {
        client.subscribe(`/topic/room/${keyword}`, (message) => {
          const newMsg = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMsg]);
        });
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
    <div style={styles.container}>
      <h2 style={styles.header}>Room: {keyword}</h2>

      <div style={styles.chatBox}>
        {messages.map((m, i) => {
          const isMe = m.sender === name;

          return (
            <div
              key={i}
              style={{
                ...styles.messageContainer,
                justifyContent: isMe ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  ...styles.message,
                  backgroundColor: isMe ? "#00ff00" : "#222",
                  color: isMe ? "#000" : "#fff",
                }}
              >
                {!isMe && <div style={styles.sender}>{m.sender}</div>}
                <div>{m.content}</div>
                <div style={styles.timestamp}>
                  {formatTime(m.timestamp)}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={bottomRef}></div>
      </div>

      <div style={styles.inputBox}>
        <input
          style={styles.input}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type message..."
        />
        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    fontFamily: "Arial",
  },
  header: {
    marginBottom: "10px",
  },
  chatBox: {
    height: "400px",
    overflowY: "auto",
    border: "1px solid #444",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  messageContainer: {
    display: "flex",
  },
  message: {
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "70%",
  },
  sender: {
    fontSize: "12px",
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: "10px",
    textAlign: "right",
  },
  inputBox: {
    display: "flex",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
  },
  button: {
    marginLeft: "10px",
    padding: "10px",
    background: "#00ff00",
    border: "none",
    cursor: "pointer",
  },
};