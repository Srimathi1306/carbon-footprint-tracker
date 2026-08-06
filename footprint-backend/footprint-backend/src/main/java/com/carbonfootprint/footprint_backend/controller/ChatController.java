package com.carbonfootprint.footprint_backend.controller;


import com.carbonfootprint.footprint_backend.dto.ChatRequest;
import com.carbonfootprint.footprint_backend.dto.ChatResponse;
import com.carbonfootprint.footprint_backend.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping
    public ChatResponse chat(
            @RequestBody ChatRequest request,
            Authentication authentication
    ) {

        String email = authentication.getName();

        String response =
                chatService.askQuestion(email, request.getMessage());

        return new ChatResponse(response);

    }
}