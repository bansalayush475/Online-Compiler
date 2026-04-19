package com.compiler.service;

import com.compiler.dto.ExecuteRequest;
import com.compiler.dto.ExecuteResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Map;

@Service
public class ExecutionService {

    private static final Logger log = LoggerFactory.getLogger(ExecutionService.class);

    @Value("${jdoodle.client-id}")
    private String jdoodleClientId;

    @Value("${jdoodle.client-secret}")
    private String jdoodleClientSecret;

    @Value("${jdoodle.api-url}")
    private String jdoodleApiUrl;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10)).build();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final Map<String, String> LANGUAGE_MAP = Map.ofEntries(
        Map.entry("java", "java"), Map.entry("python", "python3"),
        Map.entry("javascript", "nodejs"), Map.entry("c", "c"),
        Map.entry("cpp", "cpp17"), Map.entry("csharp", "csharp"),
        Map.entry("go", "go"), Map.entry("rust", "rust"),
        Map.entry("ruby", "ruby"), Map.entry("php", "php"),
        Map.entry("swift", "swift"), Map.entry("kotlin", "kotlin"),
        Map.entry("typescript", "typescript_node"), Map.entry("scala", "scala"),
        Map.entry("bash", "bash")
    );

    private static final Map<String, String> VERSION_MAP = Map.ofEntries(
        Map.entry("java", "4"), Map.entry("python3", "4"), Map.entry("nodejs", "4"),
        Map.entry("c", "5"), Map.entry("cpp17", "1"), Map.entry("csharp", "4"),
        Map.entry("go", "4"), Map.entry("rust", "4"), Map.entry("ruby", "4"),
        Map.entry("php", "4"), Map.entry("swift", "4"), Map.entry("kotlin", "3"),
        Map.entry("typescript_node", "1"), Map.entry("scala", "4"), Map.entry("bash", "4")
    );

    public ExecuteResponse executeCode(ExecuteRequest request) {
        try {
            String jdoodleLang = LANGUAGE_MAP.getOrDefault(request.getLanguage().toLowerCase(), request.getLanguage());
            String versionIndex = (request.getVersionIndex() != null && !request.getVersionIndex().isEmpty())
                    ? request.getVersionIndex() : VERSION_MAP.getOrDefault(jdoodleLang, "0");

            ObjectNode payload = objectMapper.createObjectNode();
            payload.put("clientId", jdoodleClientId);
            payload.put("clientSecret", jdoodleClientSecret);
            payload.put("script", request.getCode());
            payload.put("language", jdoodleLang);
            payload.put("versionIndex", versionIndex);
            if (request.getStdin() != null && !request.getStdin().isEmpty()) {
                payload.put("stdin", request.getStdin());
            }

            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(URI.create(jdoodleApiUrl))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(payload)))
                    .timeout(Duration.ofSeconds(30)).build();

            HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            JsonNode json = objectMapper.readTree(response.body());

            String output = json.has("output") ? json.get("output").asText() : "";
            String error  = json.has("error")  ? json.get("error").asText()  : null;
            int statusCode = json.has("statusCode") ? json.get("statusCode").asInt() : 200;
            String memory  = json.has("memory")  ? json.get("memory").asText()  : null;
            String cpuTime = json.has("cpuTime") ? json.get("cpuTime").asText() : null;

            if (statusCode != 200 && (error == null || error.isEmpty())) { error = output; output = ""; }

            return ExecuteResponse.builder()
                    .output(output).error(error).statusCode(statusCode)
                    .memory(memory).cpuTime(cpuTime).build();

        } catch (Exception e) {
            log.error("Code execution failed", e);
            return ExecuteResponse.builder().output("").error("Execution error: " + e.getMessage()).statusCode(500).build();
        }
    }
}
