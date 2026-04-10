package com.hidechat.model;

import lombok.Data;

@Data
public class ChatMessage {

    private String sender;
    private String content;
    private String type;

    private String timestamp; // 🔥 ADD THIS
}