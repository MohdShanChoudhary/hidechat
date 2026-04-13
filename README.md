<div align="center">

<!-- Animated Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=534AB7&height=200&section=header&text=HideChat&fontSize=80&fontColor=EEEDFE&animation=fadeIn&fontAlignY=38&desc=Real-Time%20%E2%80%A2%20Anonymous%20%E2%80%A2%20No%20Login&descAlignY=60&descColor=AFA9EC" width="100%"/>

<!-- Badges -->
<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=socket.io&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black" />
</p>

<!-- Live Demo Button -->
<a href="https://hidechat-world.vercel.app/">
  <img src="https://img.shields.io/badge/🚀%20Live%20Demo-534AB7?style=for-the-badge" />
</a>

<br/><br/>

<!-- Typing Animation -->
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&pause=1000&color=7F77DD&center=true&vCenter=true&width=600&lines=Chat+anonymously+in+seconds+%F0%9F%92%AC;No+login.+No+data+stored.+No+trace.;Share+a+keyword+%E2%80%A2+Start+chatting+instantly;Built+with+Spring+Boot+%2B+React+%2B+Redis" />

</div>

---

## 📌 What is HideChat?

HideChat is a **real-time anonymous chat application** where two or more users can chat privately using a shared **keyword** — no account, no login, no permanent history.

> Enter a name → Create or join a room with a keyword → Chat live → Close the tab → Gone. ✅

---

## ✨ Features

| Feature | Status |
|--------|--------|
| 🔐 Anonymous chatting | ✅ |
| 💬 Real-time WebSocket messaging | ✅ |
| 🧑‍🤝‍🧑 Keyword-based room system | ✅ |
| 👥 Max user limit per room | ✅ |
| 🕒 Message timestamps | ✅ |
| 🔄 Auto-scroll chat | ✅ |
| ⌨️ Press Enter to send | ✅ |
| 🚫 No login / signup required | ✅ |
| 💾 No permanent data stored | ✅ |

---

## 🛠️ Tech Stack

### Frontend
```
React (Vite)         → UI framework
Axios                → HTTP requests to backend
React Router DOM     → Page routing
@stomp/stompjs       → WebSocket (STOMP protocol)
```

### Backend
```
Spring Boot          → Main framework
Spring Web           → REST APIs
Spring WebSocket     → Real-time messaging
Spring Data Redis    → Room storage
Lombok               → Reduce Java boilerplate
Maven                → Build tool
```

### Database & Deployment
```
Redis (Upstash)      → Temporary room storage
Vercel               → Frontend deployment
Render               → Backend deployment
```

---

## 🧱 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Browser                         │
│              React App (Vercel)                         │
│         Home.jsx ──────────── Chat.jsx                  │
│           │  (HTTP)              │  (WebSocket/STOMP)   │
└───────────┼──────────────────────┼─────────────────────┘
            │                      │
            ▼                      ▼
┌─────────────────────────────────────────────────────────┐
│              Spring Boot Backend (Render)               │
│                                                         │
│  RoomController  ──  RoomService  ──  ChatController    │
│        │                  │                  │          │
│    POST /api           Redis           WebSocket        │
│    /room/create        Store           Broadcast        │
│    /room/join                                           │
└─────────────────────────────────┬───────────────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │    Redis (Upstash)       │
                    │  - Room data storage     │
                    │  - User count tracking   │
                    │  - Temporary by design   │
                    └─────────────────────────┘
```

---

## 🔁 How It Works

```
1. User opens HideChat
        │
        ▼
2. Enters Name + Keyword
        │
        ├──▶ Create Room → POST /api/room/create → Redis stores room
        │
        └──▶ Join Room   → POST /api/room/join   → Redis validates & adds user
        │
        ▼
3. WebSocket connection opens
   ws://backend/ws/chat  (local)
   wss://backend/ws/chat (production)
        │
        ▼
4. Frontend subscribes to /topic/room/{keyword}
        │
        ▼
5. User sends message → /app/chat/{keyword}
        │
        ▼
6. ChatController adds timestamp → broadcasts to all subscribers
        │
        ▼
7. All users in room receive message instantly ⚡
```

---

## 📁 Project Structure

```
hidechat/
│
├── hidechat-backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/hidechat/
│   │       │       ├── HidechatBackendApplication.java   ← App entry point
│   │       │       ├── config/
│   │       │       │   ├── CorsConfig.java               ← Fix CORS issues
│   │       │       │   └── WebSocketConfig.java          ← STOMP setup
│   │       │       ├── controller/
│   │       │       │   ├── RoomController.java           ← /api/room endpoints
│   │       │       │   └── ChatController.java           ← WebSocket handler
│   │       │       ├── model/
│   │       │       │   ├── Room.java                     ← Room data model
│   │       │       │   └── ChatMessage.java              ← Message data model
│   │       │       └── service/
│   │       │           └── RoomService.java              ← Core room logic
│   │       └── resources/
│   │           └── application.properties                ← Redis config
│   └── pom.xml
│
└── hidechat-frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx     ← Name + keyword entry, create/join buttons
    │   │   └── Chat.jsx     ← WebSocket UI, messages, auto-scroll
    │   ├── App.jsx          ← Route: / and /chat/:keyword/:name
    │   └── main.jsx         ← React entry point
    ├── vercel.json          ← Fix 404 on refresh
    └── package.json
```

---

## ⚙️ Backend — Class Reference

### `Room.java`
```java
@Data
public class Room {
    private String keyword;
    private List<String> users;
    private int maxUsers;
}
```

### `ChatMessage.java`
```java
@Data
public class ChatMessage {
    private String sender;
    private String content;
    private String type;
    private String timestamp;
}
```

### `ChatController.java` — WebSocket flow
```java
@Controller
public class ChatController {
    @MessageMapping("/chat/{keyword}")     // receives from /app/chat/{keyword}
    @SendTo("/topic/room/{keyword}")       // broadcasts to all subscribers
    public ChatMessage send(ChatMessage message) {
        message.setTimestamp(LocalDateTime.now().toString());
        return message;
    }
}
```

### `WebSocketConfig.java` — STOMP setup
```
Endpoint:     /ws/chat
App prefix:   /app       ← frontend publishes here
Topic broker: /topic     ← frontend subscribes here
```

### `application.properties` — Redis config
```properties
spring.data.redis.host=YOUR_UPSTASH_HOST
spring.data.redis.port=6379
spring.data.redis.password=YOUR_PASSWORD
spring.data.redis.ssl.enabled=true
```

---

## 🚀 Run Locally

### Requirements

| Tool | Version |
|------|---------|
| Node.js | v18+ |
| Java | 17+ |
| Maven | Latest |
| Git | Any |

### Step 1 — Clone
```bash
git clone https://github.com/MohdShanChoudhary/hidechat.git
cd hidechat
```

### Step 2 — Configure Redis
Open `hidechat-backend/src/main/resources/application.properties`:
```properties
spring.data.redis.host=YOUR_HOST
spring.data.redis.port=6379
spring.data.redis.password=YOUR_PASSWORD
spring.data.redis.ssl.enabled=true
```

### Step 3 — Run Backend
```bash
cd hidechat-backend
mvn spring-boot:run
# Runs on http://localhost:8080
```

### Step 4 — Run Frontend
```bash
cd hidechat-frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### Step 5 — Test It
```
Open 2 browser tabs → Enter same keyword → Start chatting ✅
```

> **Tip:** Use a `.env` file for cleaner config:
> ```
> VITE_API_URL=http://localhost:8080
> ```

---

## 🔁 Local vs Production

| Config | Local | Production |
|--------|-------|------------|
| API URL | `http://localhost:8080` | `https://your-app.onrender.com` |
| WebSocket | `ws://localhost:8080/ws/chat` | `wss://your-app.onrender.com/ws/chat` |
| Redis | Upstash (same) | Upstash (same) |
| Frontend | `localhost:5173` | Vercel URL |

---

## ⚠️ Common Issues & Fixes

### ❌ 404 on page refresh
```
Fix: vercel.json already handles SPA routing rewrites ✅
```

### ❌ Backend not responding
```
Fix: Render free tier cold-starts — wait ~30 sec on first load ✅
```

### ❌ CORS error
```
Fix: CorsConfig.java allows all origins — check it's present ✅
```

### ❌ Redis not connecting
```
Fix: Check host, password, and make sure ssl.enabled=true (not ssl=true) ✅
```

### ❌ WebSocket fails / "global is not defined"
```
Fix: Don't use SockJS. Use @stomp/stompjs with direct WebSocket URL ✅
```

### ❌ Invalid timestamp
```
Fix: Backend adds timestamp in ChatController before broadcasting ✅
```

### ❌ Blank screen
```
Fix: Check imports in Chat.jsx and ensure WebSocket approach is correct ✅
```

---

## 🐛 Problems Faced During Development

| # | Problem | Fix |
|---|---------|-----|
| 1 | GitHub push auth failure | Used GitHub token / SSH |
| 2 | `RedisConnectionFactory` error | Fixed Redis config in `application.properties` |
| 3 | `ssl=true` not working | Changed to `ssl.enabled=true` |
| 4 | CORS block | Added `CorsConfig.java` |
| 5 | `global is not defined` | Removed SockJS, used `@stomp/stompjs` directly |
| 6 | Blank screen crash | Fixed dependencies and WebSocket setup |
| 7 | Invalid timestamp | Timestamp now added in `ChatController` |

---

## 🔮 What You Can Add Next

- [ ] Typing indicator
- [ ] Online users count
- [ ] Leave room button
- [ ] Room expiry timer (TTL in Redis)
- [ ] Message persistence for session
- [ ] Dark / light theme toggle
- [ ] Responsive mobile UI
- [ ] `.env` support in frontend
- [ ] Cleaner API response objects

---

## 📚 What This Project Covers

```
✅ REST API design
✅ WebSocket (STOMP protocol)
✅ React routing and state management
✅ Redis for temporary storage
✅ Spring Boot backend
✅ CORS handling
✅ Full-stack integration
✅ Deployment (Vercel + Render + Upstash)
```

---

## 📄 License

This project is open source — feel free to fork, learn, and build on it.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=534AB7&height=100&section=footer&fontColor=EEEDFE" width="100%"/>

**Built with React · Spring Boot · Redis · Deployed on Vercel + Render**

<br/>

<img src="https://img.shields.io/github/stars/MohdShanChoudhary/hidechat?style=social" />
&nbsp;
<img src="https://img.shields.io/badge/made%20by-MohdShanChoudhary-534AB7?style=flat-square" />

</div>
