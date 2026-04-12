import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");

  const createRoom = async () => {
    if (!name || !keyword) {
      alert("Enter name and keyword");
      return;
    }

    await axios.post(
      `http://hidechat-1nub.onrender.com/api/room/create?keyword=${keyword}&username=${name}&maxUsers=2`
    );
    window.location.href = `/chat/${keyword}/${name}`;
  };

  const joinRoom = async () => {
    if (!name || !keyword) {
      alert("Enter name and keyword");
      return;
    }

    await axios.post(
      `http://hidechat-1nub.onrender.com/api/room/join?keyword=${keyword}&username=${name}`
    );
    window.location.href = `/chat/${keyword}/${name}`;
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
          .home-button:hover {
            background-color: #00aa00 !important;
          }
          @media (max-width: 768px) {
            .home-container { max-width: 90% !important; margin: 50px auto !important; padding: 20px !important; }
            .home-title { font-size: 2em !important; }
            .home-input { font-size: 16px !important; }
            .home-button { font-size: 16px !important; }
          }
        `}
      </style>
      <div style={styles.container} className="home-container">
        <h1 style={styles.title} className="home-title">HideChat 🔐</h1>
        <p style={styles.subtitle}>Enter the Matrix of Secure Chats</p>

        <div style={styles.form}>
          <input
            style={styles.input}
            className="home-input"
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={styles.input}
            className="home-input"
            placeholder="Room Keyword"
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button style={styles.button} className="home-button" onClick={createRoom}>
            Create Room
          </button>

          <button style={styles.button} className="home-button" onClick={joinRoom}>
            Join Room
          </button>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "100px auto",
    textAlign: "center",
    padding: "40px",
    border: "2px solid #00ff00",
    borderRadius: "10px",
    backgroundColor: "#111",
    boxShadow: "0 0 20px #00ff00",
  },
  title: {
    fontSize: "3em",
    marginBottom: "10px",
    textShadow: "0 0 10px #00ff00",
  },
  subtitle: {
    fontSize: "1.2em",
    marginBottom: "30px",
    color: "#00aa00",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    width: "100%",
    padding: "15px",
    borderRadius: "5px",
    border: "1px solid #00ff00",
    backgroundColor: "#000",
    color: "#00ff00",
    fontSize: "18px",
    fontFamily: "inherit",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "15px",
    borderRadius: "5px",
    border: "1px solid #00ff00",
    backgroundColor: "#00ff00",
    color: "#000",
    cursor: "pointer",
    fontSize: "18px",
    fontFamily: "inherit",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
};