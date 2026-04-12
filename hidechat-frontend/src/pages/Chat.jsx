import { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const clientRef = useRef(null);
  const bottomRef = useRef(null);

  const keyword = window.location.pathname.split("/")[2];
  const name = window.location.pathname.split("/")[3];

  // ✅ Safe time format
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
      brokerURL: "wss://hidechat-1nub.onrender.com/ws/chat",
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

  // 🔥 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔥 Enter = send
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
                  backgroundColor: isMe ? "#dcf8c6" : "#fff",
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
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
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
    fontWeight: "bold",
    fontSize: "12px",
    marginBottom: "3px",
  },
  timestamp: {
    fontSize: "11px",
    textAlign: "right",
    marginTop: "5px",
    color: "#666",
  },
  inputBox: {
    display: "flex",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    marginLeft: "10px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
};