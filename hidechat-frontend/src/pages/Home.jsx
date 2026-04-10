import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");

  const createRoom = async () => {
    await axios.post(
      `http://localhost:8080/api/room/create?keyword=${keyword}&username=${name}&maxUsers=2`
    );
    window.location.href = `/chat/${keyword}/${name}`;
  };

  const joinRoom = async () => {
    await axios.post(
      `http://localhost:8080/api/room/join?keyword=${keyword}&username=${name}`
    );
    window.location.href = `/chat/${keyword}/${name}`;
  };

  return (
    <div>
      <h1>HideChat</h1>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Keyword" onChange={(e) => setKeyword(e.target.value)} />
      <button onClick={createRoom}>Create</button>
      <button onClick={joinRoom}>Join</button>
    </div>
  );
}