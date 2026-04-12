import { useState } from "react";
import axios from "axios";

const API = "https://hidechat-1nub.onrender.com";

export default function Home() {
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState("");

  const createRoom = async () => {
    if (!name || !keyword) return alert("Please enter name and room keyword");
    setLoading("create");
    try {
      await axios.post(`${API}/api/room/create?keyword=${keyword}&username=${name}&maxUsers=2`);
      window.location.href = `/chat/${keyword}/${name}`;
    } catch {
      alert("Failed to create room");
    }
    setLoading("");
  };

  const joinRoom = async () => {
    if (!name || !keyword) return alert("Please enter name and room keyword");
    setLoading("join");
    try {
      await axios.post(`${API}/api/room/join?keyword=${keyword}&username=${name}`);
      window.location.href = `/chat/${keyword}/${name}`;
    } catch {
      alert("Failed to join room");
    }
    setLoading("");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Inter', sans-serif;
          background-color: #0a0a0f;
          min-height: 100vh;
          color: #e2e8f0;
          overflow-x: hidden;
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
            linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .bg-orb1 {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
          top: -150px; left: -150px;
        }

        .bg-orb2 {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%);
          bottom: -100px; right: -100px;
        }

        .page {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
        }

        .card {
          width: 100%;
          max-width: 420px;
          background: rgba(15, 15, 25, 0.85);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 20px;
          padding: 2.5rem 2rem;
          backdrop-filter: blur(16px);
        }

        .logo-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .logo-icon {
          width: 42px; height: 42px;
          border-radius: 10px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .logo-text {
          font-size: 26px;
          font-weight: 700;
          color: #f1f5f9;
          letter-spacing: -0.5px;
        }

        .logo-text span {
          color: #6366f1;
        }

        .tagline {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 2rem;
          margin-top: 4px;
          letter-spacing: 0.2px;
        }

        .label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: #94a3b8;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          margin-bottom: 7px;
        }

        .field {
          margin-bottom: 1rem;
        }

        input {
          width: 100%;
          padding: 11px 14px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          color: #e2e8f0;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 10px;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        input::placeholder { color: #475569; }

        input:focus {
          border-color: rgba(99,102,241,0.6);
          background: rgba(99,102,241,0.06);
        }

        .divider {
          height: 1px;
          background: rgba(99,102,241,0.12);
          margin: 1.5rem 0;
        }

        .btn-group {
          display: flex;
          gap: 10px;
        }

        .btn {
          flex: 1;
          padding: 11px 0;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.2px;
          transition: opacity 0.15s, transform 0.1s;
        }

        .btn:active { transform: scale(0.98); }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .btn-primary {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
        }

        .btn-secondary {
          background: rgba(99,102,241,0.1);
          color: #818cf8;
          border: 1px solid rgba(99,102,241,0.25);
        }

        .btn-primary:hover:not(:disabled) { opacity: 0.88; }
        .btn-secondary:hover:not(:disabled) { background: rgba(99,102,241,0.18); }

        .footer-note {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 11.5px;
          color: #334155;
        }

        .dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #10b981;
          display: inline-block;
          margin-right: 5px;
          box-shadow: 0 0 6px #10b981;
        }

        .status-row {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #475569;
          margin-top: 0.5rem;
          gap: 4px;
        }
      `}</style>

      <div className="bg-wrap">
        <div className="bg-grid" />
        <div className="bg-orb1" />
        <div className="bg-orb2" />
      </div>

      <div className="page">
        <div className="card">
          <div className="logo-wrap">
            <div className="logo-icon">🔐</div>
            <div className="logo-text">Hide<span>Chat</span></div>
          </div>
          <p className="tagline">Encrypted private rooms — no logs, no traces.</p>

          <div className="field">
            <label className="label">Your Name</label>
            <input
              placeholder="e.g. Arjun"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="field">
            <label className="label">Room Keyword</label>
            <input
              placeholder="e.g. secret-mission"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div className="divider" />

          <div className="btn-group">
            <button
              className="btn btn-primary"
              onClick={createRoom}
              disabled={!!loading}
            >
              {loading === "create" ? "Creating..." : "Create Room"}
            </button>
            <button
              className="btn btn-secondary"
              onClick={joinRoom}
              disabled={!!loading}
            >
              {loading === "join" ? "Joining..." : "Join Room"}
            </button>
          </div>

          <div className="status-row">
            <span className="dot" />
            End-to-end encrypted · Max 2 users per room
          </div>

          <p className="footer-note">© 2025 HideChat. All conversations auto-delete.</p>
        </div>
      </div>
    </>
  );
}