package com.cos.chatapp;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping(value = "chat") //, produces = MediaType.TEXT_HTML_VALUE
    public String chat() {
        return "chat";
    }
}
