package com.compiler.dto;

public class UserDTO {
    private String id, email, name, profilePicture;
    public UserDTO() {}

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private String id, email, name, profilePicture;
        public Builder id(String v)             { this.id = v; return this; }
        public Builder email(String v)          { this.email = v; return this; }
        public Builder name(String v)           { this.name = v; return this; }
        public Builder profilePicture(String v) { this.profilePicture = v; return this; }
        public UserDTO build() {
            UserDTO d = new UserDTO();
            d.id = id; d.email = email; d.name = name; d.profilePicture = profilePicture;
            return d;
        }
    }

    public String getId()             { return id; }
    public String getEmail()          { return email; }
    public String getName()           { return name; }
    public String getProfilePicture() { return profilePicture; }
    public void setId(String v)             { this.id = v; }
    public void setEmail(String v)          { this.email = v; }
    public void setName(String v)           { this.name = v; }
    public void setProfilePicture(String v) { this.profilePicture = v; }
}
