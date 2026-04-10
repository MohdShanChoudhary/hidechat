package com.hidechat.controller;

import com.hidechat.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*") // 🔥 CORS FIX
@RestController
@RequestMapping("/api/room")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping("/create")
    public String createRoom(
            @RequestParam String keyword,
            @RequestParam String username,
            @RequestParam int maxUsers
    ) {
        return roomService.createRoom(keyword, username, maxUsers);
    }

    @PostMapping("/join")
    public String joinRoom(
            @RequestParam String keyword,
            @RequestParam String username
    ) {
        return roomService.joinRoom(keyword, username);
    }
}