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
    margin: "100px auto",
    textAlign: "center",
    padding: "40px",
    border: "2px solid #00ff00",
    backgroundColor: "#111",
  },
  title: {
    fontSize: "2.5em",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    background: "#000",
    color: "#00ff00",
    border: "1px solid #00ff00",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    background: "#00ff00",
    color: "#000",
    border: "none",
    cursor: "pointer",
  },
};