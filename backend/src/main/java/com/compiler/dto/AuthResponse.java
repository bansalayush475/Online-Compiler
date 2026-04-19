package com.compiler.dto;

public class AuthResponse {
    private String accessToken, tokenType;
    private UserDTO user;
    public AuthResponse() {}

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private String accessToken, tokenType;
        private UserDTO user;
        public Builder accessToken(String v) { this.accessToken = v; return this; }
        public Builder tokenType(String v)   { this.tokenType = v; return this; }
        public Builder user(UserDTO v)       { this.user = v; return this; }
        public AuthResponse build() {
            AuthResponse r = new AuthResponse();
            r.accessToken = accessToken; r.tokenType = tokenType; r.user = user;
            return r;
        }
    }

    public String getAccessToken() { return accessToken; }
    public String getTokenType()   { return tokenType; }
    public UserDTO getUser()       { return user; }
    public void setAccessToken(String v) { this.accessToken = v; }
    public void setTokenType(String v)   { this.tokenType = v; }
    public void setUser(UserDTO v)       { this.user = v; }
}
