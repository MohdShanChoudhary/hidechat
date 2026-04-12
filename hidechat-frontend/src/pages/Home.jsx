import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");

  const API = "https://hidechat-1nub.onrender.com"; // ✅ FIX

  const createRoom = async () => {
    if (!name || !keyword) {
      alert("Enter name and keyword");
      return;
    }

    await axios.post(
      `${API}/api/room/create?keyword=${keyword}&username=${name}&maxUsers=2`
    );

    window.location.href = `/chat/${keyword}/${name}`;
  };

  const joinRoom = async () => {
    if (!name || !keyword) {
      alert("Enter name and keyword");
      return;
    }

    await axios.post(
      `${API}/api/room/join?keyword=${keyword}&username=${name}`
    );

    window.location.href = `/chat/${keyword}/${name}`;
  };

  return (
    <>
      <style>{`
        body {
          background-color: #000;
          color: #00ff00;
          font-family: 'Courier New', monospace;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Ctext x='10' y='30' font-size='20'%3E😊%3C/text%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 50px 50px;
          margin: 0;
          padding: 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 600px) {
          body {
            font-size: 14px;
          }
          .container {
            margin: 20px;
            padding: 20px;
          }
          .title {
            font-size: 2em;
          }
        }
      `}</style>

      <div style={styles.container}>
        <h1 style={styles.title}>HideChat 🔐</h1>

        <input
          style={styles.input}
          placeholder="Your Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Room Keyword"
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button style={styles.button} onClick={createRoom}>
          Create Room
        </button>

        <button style={styles.button} onClick={joinRoom}>
          Join Room
        </button>
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    textAlign: "center",
    padding: "40px",
    border: "2px solid #00ff00",
    backgroundColor: "rgba(17,17,17,0.9)",
    width: "90%",
    boxSizing: "border-box",
    borderRadius: "10px",
    boxShadow: "0 0 20px #00ff00",
  },
  title: {
    fontSize: "2.5em",
    marginBottom: "20px",
    textShadow: "0 0 10px #00ff00",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    background: "#000",
    color: "#00ff00",
    border: "1px solid #00ff00",
    borderRadius: "5px",
    fontFamily: "inherit",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    background: "#00ff00",
    color: "#000",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontWeight: "bold",
    transition: "background 0.3s",
  },
};