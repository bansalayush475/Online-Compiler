package com.compiler.repository;

import com.compiler.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByGoogleId(String googleId);
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
