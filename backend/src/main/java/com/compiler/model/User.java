package com.compiler.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "users")
public class User {

    @Id
    private String id;

    @Indexed(unique = true)
    private String googleId;

    @Indexed(unique = true)
    private String email;

    private String name;
    private String profilePicture;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    public User() {}

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String googleId, email, name, profilePicture;
        public Builder googleId(String v)       { this.googleId = v; return this; }
        public Builder email(String v)          { this.email = v; return this; }
        public Builder name(String v)           { this.name = v; return this; }
        public Builder profilePicture(String v) { this.profilePicture = v; return this; }
        public User build() {
            User u = new User();
            u.googleId = this.googleId;
            u.email = this.email;
            u.name = this.name;
            u.profilePicture = this.profilePicture;
            return u;
        }
    }

    public String getId()             { return id; }
    public String getGoogleId()       { return googleId; }
    public String getEmail()          { return email; }
    public String getName()           { return name; }
    public String getProfilePicture() { return profilePicture; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public void setId(String id)                   { this.id = id; }
    public void setGoogleId(String googleId)       { this.googleId = googleId; }
    public void setEmail(String email)             { this.email = email; }
    public void setName(String name)               { this.name = name; }
    public void setProfilePicture(String p)        { this.profilePicture = p; }
    public void setCreatedAt(LocalDateTime t)      { this.createdAt = t; }
    public void setUpdatedAt(LocalDateTime t)      { this.updatedAt = t; }
}
