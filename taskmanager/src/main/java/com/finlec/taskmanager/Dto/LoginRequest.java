package com.finlec.taskmanager.Dto; // Ensure this matches your folder name (Dto vs dto)

import jakarta.validation.constraints.NotBlank;
import lombok.Data; // You can keep this, but we will add manual methods to be safe

public class LoginRequest {
    @NotBlank
    private String username;

    @NotBlank
    private String password;

    // --- MANUAL GETTERS & SETTERS ---
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}