package com.carbonfootprint.footprint_backend.service.ai;

import com.carbonfootprint.footprint_backend.dto.RecommendationResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GroqServiceImpl implements GroqService {

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public List<RecommendationResponse> generateRecommendations(
            List<Map.Entry<String, Double>> topActivities) {

        try {

            StringBuilder prompt = new StringBuilder();

            prompt.append("""
You are a sustainability expert.

For each activity below, generate ONE personalized recommendation.

Return ONLY valid JSON.

Example:

[
  {
    "activity":"Grid Electricity",
    "recommendation":"Switch to LED lighting."
  },
  {
    "activity":"Petrol",
    "recommendation":"Use public transport."
  }
]

Activities:

""");

            for (Map.Entry<String, Double> entry : topActivities) {

                prompt.append(entry.getKey())
                        .append(" : ")
                        .append(entry.getValue())
                        .append(" kg CO2\n");

            }

            HttpHeaders headers = new HttpHeaders();

            headers.setContentType(MediaType.APPLICATION_JSON);

            headers.setBearerAuth(apiKey);

            Map<String, Object> requestBody = Map.of(

                    "model", "openai/gpt-oss-120b",

                    "messages", List.of(

                            Map.of(
                                    "role", "user",
                                    "content", prompt.toString()
                            )

                    )

            );

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> response =
                    restTemplate.exchange(
                            apiUrl,
                            HttpMethod.POST,
                            entity,
                            String.class
                    );

            JsonNode root =
                    objectMapper.readTree(response.getBody());

            String content =
                    root.path("choices")
                            .get(0)
                            .path("message")
                            .path("content")
                            .asText();

            return objectMapper.readValue(
                    content,
                    objectMapper.getTypeFactory()
                            .constructCollectionType(
                                    List.class,
                                    RecommendationResponse.class
                            )
            );

        }

        catch (Exception e) {

            return new ArrayList<>();

        }


    }

    @Override
    public String askChatbot(String prompt) {

        try {

            HttpHeaders headers = new HttpHeaders();

            headers.setContentType(MediaType.APPLICATION_JSON);

            headers.setBearerAuth(apiKey);

            Map<String, Object> requestBody = Map.of(

                    "model", "openai/gpt-oss-120b",

                    "messages", List.of(

                            Map.of(
                                    "role", "system",
                                    "content",
                                    """
                                    You are CarbonBot, an AI assistant for a Carbon Footprint Tracker.
    
                                    Answer naturally.
    
                                    Be concise.
    
                                    Never invent values.
    
                                    Use ONLY the information provided in the prompt.
                                    """
                            ),

                            Map.of(
                                    "role", "user",
                                    "content", prompt
                            )

                    )

            );

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> response =
                    restTemplate.exchange(
                            apiUrl,
                            HttpMethod.POST,
                            entity,
                            String.class
                    );

            JsonNode root =
                    objectMapper.readTree(response.getBody());

            return root.path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

        }

        catch (Exception e) {

            return "Sorry, I couldn't answer your question right now.";

        }

    }
}