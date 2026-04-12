import { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [connected, setConnected] = useState(false);
  const clientRef = useRef(null);
  const bottomRef = useRef(null);

  const keyword = window.location.pathname.split("/")[2];
  const name = window.location.pathname.split("/")[3];

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    if (isNaN(date)) return "";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    const client = new Client({
      brokerURL: "wss://hidechat-1nub.onrender.com/ws/chat",
      reconnectDelay: 5000,
      onConnect: () => {
        setConnected(true);
        client.subscribe(`/topic/room/${keyword}`, (message) => {
          const newMsg = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMsg]);
        });
      },
      onDisconnect: () => setConnected(false),
    });

    client.activate();
    clientRef.current = client;
    return () => client.deactivate();
  }, [keyword]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) sendMessage();
  };

  const sendMessage = () => {
    if (!msg.trim() || !clientRef.current?.connected) return;
    clientRef.current.publish({
      destination: `/app/chat/${keyword}`,
      body: JSON.stringify({ sender: name, content: msg, type: "CHAT" }),
    });
    setMsg("");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Inter', sans-serif;
          background-color: #0a0a0f;
          height: 100vh;
          overflow: hidden;
          color: #e2e8f0;
        }

        .bg-wrap {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .bg-orb1 {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%);
          top: -200px; right: -100px;
        }

        .bg-orb2 {
          position: absolute;
          width: 350px; height: 350px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%);
          bottom: -100px; left: -100px;
        }

        .chat-shell {
          position: relative;
          z-index: 1;
          height: 100vh;
          max-width: 680px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        /* HEADER */
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(99,102,241,0.15);
          background: rgba(10,10,20,0.8);
          backdrop-filter: blur(12px);
          flex-shrink: 0;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-icon {
          width: 36px; height: 36px;
          border-radius: 9px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          font-size: 17px;
          flex-shrink: 0;
        }

        .room-name {
          font-size: 15px;
          font-weight: 600;
          color: #f1f5f9;
          letter-spacing: -0.2px;
        }

        .room-sub {
          font-size: 11.5px;
          color: #475569;
          margin-top: 1px;
        }

        .status-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #475569;
          padding: 5px 12px;
          border-radius: 20px;
          border: 1px solid rgba(99,102,241,0.12);
          background: rgba(99,102,241,0.06);
        }

        .dot-conn {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          transition: background 0.3s;
        }

        .dot-conn.on { background: #10b981; box-shadow: 0 0 5px #10b981; }
        .dot-conn.off { background: #f59e0b; }

        /* MESSAGES AREA */
        .messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scrollbar-width: thin;
          scrollbar-color: rgba(99,102,241,0.15) transparent;
        }

        .messages::-webkit-scrollbar { width: 5px; }
        .messages::-webkit-scrollbar-track { background: transparent; }
        .messages::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.2); border-radius: 5px; }

        .empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #334155;
          font-size: 13px;
          margin: auto;
          padding: 3rem 0;
        }

        .empty-icon { font-size: 32px; margin-bottom: 4px; }

        /* MESSAGE ROWS */
        .msg-row {
          display: flex;
          align-items: flex-end;
          gap: 8px;
        }

        .msg-row.me { flex-direction: row-reverse; }

        .avatar {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: rgba(99,102,241,0.2);
          border: 1px solid rgba(99,102,241,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
          font-weight: 600;
          color: #818cf8;
          flex-shrink: 0;
        }

        .bubble-wrap { max-width: 68%; }

        .sender-label {
          font-size: 10.5px;
          color: #475569;
          margin-bottom: 3px;
          padding-left: 3px;
        }

        .msg-row.me .sender-label { text-align: right; padding-right: 3px; }

        .bubble {
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 14px;
          line-height: 1.5;
          word-break: break-word;
        }

        .bubble.them {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: #e2e8f0;
          border-bottom-left-radius: 4px;
        }

        .bubble.me {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          border-bottom-right-radius: 4px;
        }

        .ts {
          font-size: 10px;
          color: rgba(255,255,255,0.35);
          text-align: right;
          margin-top: 4px;
          padding-right: 2px;
        }

        .bubble.them .ts { color: #334155; text-align: left; }

        /* INPUT AREA */
        .input-area {
          padding: 14px 16px;
          border-top: 1px solid rgba(99,102,241,0.12);
          background: rgba(10,10,20,0.85);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .chat-input {
          flex: 1;
          padding: 11px 16px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          color: #e2e8f0;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(99,102,241,0.18);
          border-radius: 12px;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        .chat-input::placeholder { color: #334155; }
        .chat-input:focus {
          border-color: rgba(99,102,241,0.5);
          background: rgba(99,102,241,0.05);
        }

        .send-btn {
          width: 42px; height: 42px;
          border-radius: 11px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: opacity 0.15s, transform 0.1s;
        }

        .send-btn:hover { opacity: 0.85; }
        .send-btn:active { transform: scale(0.95); }
        .send-btn:disabled { opacity: 0.35; cursor: not-allowed; }

        .send-btn svg { width: 18px; height: 18px; }
      `}</style>

      <div className="bg-wrap">
        <div className="bg-grid" />
        <div className="bg-orb1" />
        <div className="bg-orb2" />
      </div>

      <div className="chat-shell">
        {/* Header */}
        <div className="header">
          <div className="header-left">
            <div className="header-icon">🔐</div>
            <div>
              <div className="room-name">{keyword}</div>
              <div className="room-sub">Logged in as <strong style={{ color: "#818cf8" }}>{name}</strong></div>
            </div>
          </div>
          <div className="status-pill">
            <span className={`dot-conn ${connected ? "on" : "off"}`} />
            {connected ? "Connected" : "Connecting..."}
          </div>
        </div>

        {/* Messages */}
        <div className="messages">
          {messages.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">💬</div>
              <div>No messages yet</div>
              <div style={{ fontSize: 12 }}>Share the room keyword to invite someone</div>
            </div>
          )}

          {messages.map((m, i) => {
            const isMe = m.sender === name;
            const initials = m.sender?.slice(0, 2).toUpperCase();
            return (
              <div key={i} className={`msg-row ${isMe ? "me" : ""}`}>
                {!isMe && <div className="avatar">{initials}</div>}
                <div className="bubble-wrap">
                  <div className="sender-label">{m.sender}</div>
                  <div className={`bubble ${isMe ? "me" : "them"}`}>
                    {m.content}
                    <div className="ts">{formatTime(m.timestamp)}</div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="input-area">
          <input
            className="chat-input"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
          />
          <button
            className="send-btn"
            onClick={sendMessage}
            disabled={!msg.trim() || !connected}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}