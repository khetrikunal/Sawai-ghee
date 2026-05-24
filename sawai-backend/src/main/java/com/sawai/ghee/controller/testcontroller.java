package com.sawai.ghee.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testcontroller {
    @GetMapping("/test")
    public String test(){
        return "Backend Connection";
    }

}
