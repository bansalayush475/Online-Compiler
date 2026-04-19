package com.compiler.dto;

import jakarta.validation.constraints.NotBlank;

public class SnippetRequest {
    @NotBlank(message = "Title is required")
    private String title;
    @NotBlank(message = "Code is required")
    private String code;
    @NotBlank(message = "Language is required")
    private String language;
    private String versionIndex;
    private String description;

    public SnippetRequest() {}

    public String getTitle()        { return title; }
    public String getCode()         { return code; }
    public String getLanguage()     { return language; }
    public String getVersionIndex() { return versionIndex; }
    public String getDescription()  { return description; }
    public void setTitle(String v)        { this.title = v; }
    public void setCode(String v)         { this.code = v; }
    public void setLanguage(String v)     { this.language = v; }
    public void setVersionIndex(String v) { this.versionIndex = v; }
    public void setDescription(String v)  { this.description = v; }
}
