package com.compiler.controller;

import com.compiler.dto.ExecuteRequest;
import com.compiler.dto.ExecuteResponse;
import com.compiler.service.ExecutionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/execute")
public class ExecutionController {

    private final ExecutionService executionService;

    public ExecutionController(ExecutionService executionService) {
        this.executionService = executionService;
    }

    @PostMapping
    public ResponseEntity<ExecuteResponse> executeCode(@Valid @RequestBody ExecuteRequest request) {
        return ResponseEntity.ok(executionService.executeCode(request));
    }
}
