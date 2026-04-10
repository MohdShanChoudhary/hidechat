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
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws/chat",
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/room/${keyword}`, (message) => {
          const newMsg = JSON.parse(message.body);
          if (!newMsg.timestamp) {
            newMsg.timestamp = new Date().toISOString();
          }
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

  // 🔥 Enter press = send
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
        timestamp: new Date().toISOString(),
      }),
    });

    setMsg("");
  };

  return (
    <>
      <style>
        {`
          body {
            background-color: #000;
            color: #00ff00;
            font-family: 'Courier New', monospace;
            margin: 0;
            padding: 0;
          }
          .chat-container {
            border: 2px solid #00ff00;
            border-radius: 10px;
            background-color: #111;
            box-shadow: 0 0 20px #00ff00;
          }
          .chat-header {
            text-align: left !important;
            font-size: 1.5em;
            text-shadow: 0 0 10px #00ff00;
            margin-bottom: 20px;
          }
          .chat-box {
            border: 1px solid #00ff00;
            background-color: #e5ddd5;
            color: #000;
            background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23e5ddd5"/><line x1="0" y1="0" x2="100" y2="100" stroke="%23d4d4d4" stroke-width="1"/><line x1="100" y1="0" x2="0" y2="100" stroke="%23d4d4d4" stroke-width="1"/></svg>');
            background-size: 100px 100px;
          }
          .message {
            border: 1px solid #00ff00;
          }
          .input {
            border: 1px solid #00ff00;
            background-color: #fff;
            color: #000;
          }
          .button {
            background-color: #00ff00;
            color: #000;
          }
          .button:hover {
            background-color: #00aa00;
          }
          @media (max-width: 768px) {
            .chat-container { max-width: 95% !important; padding: 10px !important; margin: 20px auto !important; }
            .chat-header { font-size: 1.2em !important; }
            .chat-box { height: 60vh !important; padding: 5px !important; }
            .message { max-width: 85% !important; padding: 6px 10px !important; }
            .input-box { flex-direction: column !important; gap: 5px !important; }
            .input { padding: 8px !important; }
            .button { padding: 8px 15px !important; }
          }
        `}
      </style>
      <div style={styles.container} className="chat-container">
        <h2 style={styles.header} className="chat-header">Room: {keyword}</h2>

        <div style={styles.chatBox} className="chat-box">
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
                    backgroundColor: isMe ? "#dcf8c6" : "#ffffff",
                    color: "#000",
                    border: "none",
                  }}
                  className="message"
                >
                  {!isMe && <div style={styles.sender}>{m.sender}</div>}
                  <div>{m.content}</div>
                  <div style={styles.timestamp}>{formatTime(m.timestamp)}</div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef}></div>
        </div>

        <div style={styles.inputBox} className="input-box">
          <input
            style={styles.input}
            className="input"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type message..."
          />
          <button style={styles.button} className="button" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    boxSizing: "border-box",
    width: "100%",
  },
  header: {
    marginBottom: "10px",
    fontSize: "24px",
  },
  chatBox: {
    height: "70vh",
    borderRadius: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    gap: "10px",
  },
  messageContainer: {
    display: "flex",
    width: "100%",
  },
  message: {
    padding: "8px 12px",
    borderRadius: "18px",
    maxWidth: "70%",
    wordWrap: "break-word",
    position: "relative",
    marginBottom: "5px",
  },
  sender: {
    fontWeight: "bold",
    fontSize: "14px",
    marginBottom: "4px",
  },
  timestamp: {
    fontSize: "12px",
    color: "#666",
    textAlign: "right",
    marginTop: "4px",
  },
  inputBox: {
    display: "flex",
    marginTop: "10px",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "25px",
    outline: "none",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "16px",
  },
};