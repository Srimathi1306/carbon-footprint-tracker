package com.carbonfootprint.footprint_backend.chat;

import org.springframework.stereotype.Component;

@Component
public class ChatIntentDetector {

    public ChatIntent detect(String message){

        message = message.toLowerCase();

        if(message.contains("yesterday"))
            return ChatIntent.YESTERDAY;

        if(message.contains("today"))
            return ChatIntent.TODAY;

        if(message.contains("week"))
            return ChatIntent.WEEK;

        if(message.contains("month"))
            return ChatIntent.MONTH;

        if(message.contains("goal"))
            return ChatIntent.GOAL;

        if(message.contains("xp"))
            return ChatIntent.XP;

        if(message.contains("badge"))
            return ChatIntent.BADGE;

        if(message.contains("streak"))
            return ChatIntent.STREAK;

        if(message.contains("activity"))
            return ChatIntent.ACTIVITY;

        if(message.contains("user"))
            return ChatIntent.ADMIN_USERS;

        if(message.contains("dashboard"))
            return ChatIntent.ADMIN_ACTIVITY;

        return ChatIntent.GENERAL;

    }

}