package com.compiler.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "snippets")
public class Snippet {

    @Id
    private String id;

    @Indexed
    private String userId;

    private String title;
    private String code;
    private String language;
    private String versionIndex;
    private String description;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    public Snippet() {}

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String userId, title, code, language, versionIndex, description;
        public Builder userId(String v)       { this.userId = v; return this; }
        public Builder title(String v)        { this.title = v; return this; }
        public Builder code(String v)         { this.code = v; return this; }
        public Builder language(String v)     { this.language = v; return this; }
        public Builder versionIndex(String v) { this.versionIndex = v; return this; }
        public Builder description(String v)  { this.description = v; return this; }
        public Snippet build() {
            Snippet s = new Snippet();
            s.userId = this.userId;
            s.title = this.title;
            s.code = this.code;
            s.language = this.language;
            s.versionIndex = this.versionIndex;
            s.description = this.description;
            return s;
        }
    }

    public String getId()           { return id; }
    public String getUserId()       { return userId; }
    public String getTitle()        { return title; }
    public String getCode()         { return code; }
    public String getLanguage()     { return language; }
    public String getVersionIndex() { return versionIndex; }
    public String getDescription()  { return description; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public void setId(String id)                { this.id = id; }
    public void setUserId(String v)             { this.userId = v; }
    public void setTitle(String v)              { this.title = v; }
    public void setCode(String v)               { this.code = v; }
    public void setLanguage(String v)           { this.language = v; }
    public void setVersionIndex(String v)       { this.versionIndex = v; }
    public void setDescription(String v)        { this.description = v; }
    public void setCreatedAt(LocalDateTime t)   { this.createdAt = t; }
    public void setUpdatedAt(LocalDateTime t)   { this.updatedAt = t; }
}
