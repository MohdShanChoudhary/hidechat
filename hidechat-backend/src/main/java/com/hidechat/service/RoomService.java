package com.hidechat.service;

import com.hidechat.model.Room;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoomService {

    private Map<String, Room> rooms = new HashMap<>();

    public String createRoom(String keyword, String username, int maxUsers) {
        if (rooms.containsKey(keyword)) {
            return "Room already exists";
        }

        Room room = new Room();
        room.setKeyword(keyword);
        room.setMaxUsers(maxUsers);
        room.setUsers(new ArrayList<>());

        room.getUsers().add(username);
        rooms.put(keyword, room);

        return "Room created successfully";
    }

    public String joinRoom(String keyword, String username) {
        Room room = rooms.get(keyword);

        if (room == null) return "Room not found";

        if (room.getUsers().size() >= room.getMaxUsers()) {
            return "Room full";
        }

        room.getUsers().add(username);
        return "Joined successfully";
    }
}