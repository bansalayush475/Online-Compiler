package com.compiler.repository;

import com.compiler.model.Snippet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SnippetRepository extends MongoRepository<Snippet, String> {
    List<Snippet> findByUserIdOrderByUpdatedAtDesc(String userId);
    Optional<Snippet> findByIdAndUserId(String id, String userId);
    void deleteByIdAndUserId(String id, String userId);
    long countByUserId(String userId);
}
