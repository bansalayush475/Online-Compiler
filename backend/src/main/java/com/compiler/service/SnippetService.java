package com.compiler.service;

import com.compiler.dto.SnippetRequest;
import com.compiler.dto.SnippetResponse;
import com.compiler.model.Snippet;
import com.compiler.repository.SnippetRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SnippetService {

    private static final Logger log = LoggerFactory.getLogger(SnippetService.class);

    private final SnippetRepository snippetRepository;

    public SnippetService(SnippetRepository snippetRepository) {
        this.snippetRepository = snippetRepository;
    }

    public List<SnippetResponse> getUserSnippets(String userId) {
        return snippetRepository.findByUserIdOrderByUpdatedAtDesc(userId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public SnippetResponse getSnippetById(String snippetId, String userId) {
        Snippet snippet = snippetRepository.findByIdAndUserId(snippetId, userId)
                .orElseThrow(() -> new RuntimeException("Snippet not found or access denied"));
        return toResponse(snippet);
    }

    public SnippetResponse createSnippet(SnippetRequest request, String userId) {
        Snippet snippet = Snippet.builder()
                .userId(userId)
                .title(request.getTitle())
                .code(request.getCode())
                .language(request.getLanguage())
                .versionIndex(request.getVersionIndex() != null ? request.getVersionIndex() : "0")
                .description(request.getDescription())
                .build();
        Snippet saved = snippetRepository.save(snippet);
        log.info("Created snippet '{}' for user {}", saved.getTitle(), userId);
        return toResponse(saved);
    }

    public SnippetResponse updateSnippet(String snippetId, SnippetRequest request, String userId) {
        Snippet snippet = snippetRepository.findByIdAndUserId(snippetId, userId)
                .orElseThrow(() -> new RuntimeException("Snippet not found or access denied"));
        snippet.setTitle(request.getTitle());
        snippet.setCode(request.getCode());
        snippet.setLanguage(request.getLanguage());
        if (request.getVersionIndex() != null) snippet.setVersionIndex(request.getVersionIndex());
        snippet.setDescription(request.getDescription());
        Snippet updated = snippetRepository.save(snippet);
        log.info("Updated snippet '{}' for user {}", updated.getTitle(), userId);
        return toResponse(updated);
    }

    public void deleteSnippet(String snippetId, String userId) {
        Snippet snippet = snippetRepository.findByIdAndUserId(snippetId, userId)
                .orElseThrow(() -> new RuntimeException("Snippet not found or access denied"));
        snippetRepository.delete(snippet);
        log.info("Deleted snippet {} for user {}", snippetId, userId);
    }

    private SnippetResponse toResponse(Snippet s) {
        return SnippetResponse.builder()
                .id(s.getId())
                .userId(s.getUserId())
                .title(s.getTitle())
                .code(s.getCode())
                .language(s.getLanguage())
                .versionIndex(s.getVersionIndex())
                .description(s.getDescription())
                .createdAt(s.getCreatedAt())
                .updatedAt(s.getUpdatedAt())
                .build();
    }
}
