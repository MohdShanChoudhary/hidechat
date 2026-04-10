package com.hidechat.model;

import lombok.Data;
import java.util.List;

@Data
public class Room {
    private String keyword;
    private List<String> users;
    private int maxUsers;
}