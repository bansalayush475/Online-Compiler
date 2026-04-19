package com.compiler.service;

import com.compiler.dto.AuthResponse;
import com.compiler.dto.GoogleAuthRequest;
import com.compiler.dto.UserDTO;
import com.compiler.model.User;
import com.compiler.repository.UserRepository;
import com.compiler.security.JwtTokenProvider;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10)).build();

    public AuthService(UserRepository userRepository, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public AuthResponse authenticateWithGoogle(GoogleAuthRequest request) {
        String token = request.getToken();
        if (token == null || token.isBlank()) throw new RuntimeException("Token is required");

        GoogleUserInfo info = fetchGoogleUserInfo(token);

        User user = userRepository.findByGoogleId(info.googleId())
                .orElseGet(() -> userRepository.findByEmail(info.email())
                        .orElseGet(() -> {
                            User n = User.builder()
                                    .googleId(info.googleId()).email(info.email())
                                    .name(info.name()).profilePicture(info.picture()).build();
                            return userRepository.save(n);
                        }));

        boolean dirty = false;
        if (info.googleId() != null && !info.googleId().equals(user.getGoogleId())) { user.setGoogleId(info.googleId()); dirty = true; }
        if (info.name() != null && !info.name().equals(user.getName()))             { user.setName(info.name()); dirty = true; }
        if (info.picture() != null && !info.picture().equals(user.getProfilePicture())) { user.setProfilePicture(info.picture()); dirty = true; }
        if (dirty) userRepository.save(user);

        String jwt = jwtTokenProvider.generateToken(user.getId(), user.getEmail());

        return AuthResponse.builder()
                .accessToken(jwt).tokenType("Bearer")
                .user(UserDTO.builder().id(user.getId()).email(user.getEmail())
                        .name(user.getName()).profilePicture(user.getProfilePicture()).build())
                .build();
    }

    private GoogleUserInfo fetchGoogleUserInfo(String token) {
        // Try access token -> userinfo endpoint
        try {
            HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create("https://www.googleapis.com/oauth2/v3/userinfo"))
                    .header("Authorization", "Bearer " + token)
                    .GET().timeout(Duration.ofSeconds(10)).build();
            HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
            log.debug("userinfo status={}", res.statusCode());
            if (res.statusCode() == 200) {
                JsonNode json = objectMapper.readTree(res.body());
                String sub = json.path("sub").asText(null);
                String email = json.path("email").asText(null);
                if (sub != null && email != null) {
                    log.info("Google userinfo OK for {}", email);
                    return new GoogleUserInfo(sub, email, json.path("name").asText(null), json.path("picture").asText(null));
                }
            }
        } catch (Exception e) { log.warn("userinfo failed: {}", e.getMessage()); }

        // Fallback: id token -> tokeninfo endpoint
        try {
            HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create("https://oauth2.googleapis.com/tokeninfo?id_token=" + token))
                    .GET().timeout(Duration.ofSeconds(10)).build();
            HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
            log.debug("tokeninfo status={}", res.statusCode());
            if (res.statusCode() == 200) {
                JsonNode json = objectMapper.readTree(res.body());
                String sub = json.path("sub").asText(null);
                String email = json.path("email").asText(null);
                if (sub != null && email != null) {
                    log.info("Google tokeninfo OK for {}", email);
                    return new GoogleUserInfo(sub, email, json.path("name").asText(null), json.path("picture").asText(null));
                }
            }
        } catch (Exception e) { log.warn("tokeninfo failed: {}", e.getMessage()); }

        throw new RuntimeException("Could not verify Google token — it may be invalid or expired");
    }

    public UserDTO getCurrentUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserDTO.builder().id(user.getId()).email(user.getEmail())
                .name(user.getName()).profilePicture(user.getProfilePicture()).build();
    }

    private record GoogleUserInfo(String googleId, String email, String name, String picture) {}
}
