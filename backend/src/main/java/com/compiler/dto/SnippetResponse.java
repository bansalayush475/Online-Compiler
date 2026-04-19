package com.compiler.dto;

import java.time.LocalDateTime;

public class SnippetResponse {
    private String id, userId, title, code, language, versionIndex, description;
    private LocalDateTime createdAt, updatedAt;

    public SnippetResponse() {}

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private String id, userId, title, code, language, versionIndex, description;
        private LocalDateTime createdAt, updatedAt;
        public Builder id(String v)           { this.id = v; return this; }
        public Builder userId(String v)       { this.userId = v; return this; }
        public Builder title(String v)        { this.title = v; return this; }
        public Builder code(String v)         { this.code = v; return this; }
        public Builder language(String v)     { this.language = v; return this; }
        public Builder versionIndex(String v) { this.versionIndex = v; return this; }
        public Builder description(String v)  { this.description = v; return this; }
        public Builder createdAt(LocalDateTime v) { this.createdAt = v; return this; }
        public Builder updatedAt(LocalDateTime v) { this.updatedAt = v; return this; }
        public SnippetResponse build() {
            SnippetResponse r = new SnippetResponse();
            r.id = id; r.userId = userId; r.title = title; r.code = code;
            r.language = language; r.versionIndex = versionIndex;
            r.description = description; r.createdAt = createdAt; r.updatedAt = updatedAt;
            return r;
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
    public void setId(String v)           { this.id = v; }
    public void setUserId(String v)       { this.userId = v; }
    public void setTitle(String v)        { this.title = v; }
    public void setCode(String v)         { this.code = v; }
    public void setLanguage(String v)     { this.language = v; }
    public void setVersionIndex(String v) { this.versionIndex = v; }
    public void setDescription(String v)  { this.description = v; }
    public void setCreatedAt(LocalDateTime v) { this.createdAt = v; }
    public void setUpdatedAt(LocalDateTime v) { this.updatedAt = v; }
}
