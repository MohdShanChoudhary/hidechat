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
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>HideChat 🔐</h1>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Keyword"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <br /><br />

      <button onClick={createRoom}>Create</button>
      <button onClick={joinRoom}>Join</button>
    </div>
  );
}