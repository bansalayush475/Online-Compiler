package com.compiler.controller;

import com.compiler.dto.SnippetRequest;
import com.compiler.dto.SnippetResponse;
import com.compiler.service.SnippetService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/snippets")
public class SnippetController {

    private final SnippetService snippetService;

    public SnippetController(SnippetService snippetService) {
        this.snippetService = snippetService;
    }

    @GetMapping
    public ResponseEntity<List<SnippetResponse>> getMySnippets(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(snippetService.getUserSnippets(userDetails.getUsername()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SnippetResponse> getSnippet(@PathVariable String id, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(snippetService.getSnippetById(id, userDetails.getUsername()));
    }

    @PostMapping
    public ResponseEntity<SnippetResponse> createSnippet(@Valid @RequestBody SnippetRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.status(HttpStatus.CREATED).body(snippetService.createSnippet(request, userDetails.getUsername()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SnippetResponse> updateSnippet(@PathVariable String id, @Valid @RequestBody SnippetRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(snippetService.updateSnippet(id, request, userDetails.getUsername()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSnippet(@PathVariable String id, @AuthenticationPrincipal UserDetails userDetails) {
        snippetService.deleteSnippet(id, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}
