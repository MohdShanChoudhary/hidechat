package com.hidechat.controller;

import com.hidechat.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.Instant;

@Controller
public class ChatController {

    @MessageMapping("/chat/{keyword}")
    @SendTo("/topic/room/{keyword}")
    public ChatMessage sendMessage(ChatMessage message) {

        // 🔥 Add timestamp from backend
        message.setTimestamp(Instant.now().toString());

        return message;
    }
}