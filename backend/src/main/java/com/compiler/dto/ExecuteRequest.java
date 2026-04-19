package com.compiler.dto;

import jakarta.validation.constraints.NotBlank;

public class ExecuteRequest {
    @NotBlank(message = "Code is required")
    private String code;
    @NotBlank(message = "Language is required")
    private String language;
    private String versionIndex;
    private String stdin;

    public ExecuteRequest() {}

    public String getCode()         { return code; }
    public String getLanguage()     { return language; }
    public String getVersionIndex() { return versionIndex; }
    public String getStdin()        { return stdin; }
    public void setCode(String v)         { this.code = v; }
    public void setLanguage(String v)     { this.language = v; }
    public void setVersionIndex(String v) { this.versionIndex = v; }
    public void setStdin(String v)        { this.stdin = v; }
}
