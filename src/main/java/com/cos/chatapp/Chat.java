package com.cos.chatapp;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "chat")
public class Chat {
    @Id
    private String id; // 몽고디비 아디이디는 Bson 타입
    private String msg;
    private String sender;
    private String receiver; // 귓속말 보낼 때 사용
    private Integer roomNum;

    private LocalDateTime createdAt;
}
