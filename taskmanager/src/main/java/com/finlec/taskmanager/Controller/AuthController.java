package com.finlec.taskmanager.Controller;

import com.finlec.taskmanager.Entity.User;
import com.finlec.taskmanager.Repository.UserRepository;
import com.finlec.taskmanager.Utils.JwtUtils;
import com.finlec.taskmanager.Dto.AuthResponse;
import com.finlec.taskmanager.Dto.LoginRequest;
import com.finlec.taskmanager.Dto.RegisterRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Allows React to talk to this
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    // --- LOGIN ENDPOINT ---
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        // 1. Authenticate the user (Checks username & password)
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        // 2. Set the authentication in the context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 3. Generate the JWT Token
        String jwt = jwtUtils.generateJwtToken(authentication);

        // 4. Return the Token
        return ResponseEntity.ok(new AuthResponse(jwt, loginRequest.getUsername()));
    }

    // --- REGISTER ENDPOINT ---
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {

        // 1. Check if Username exists
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        // 2. Check if Email exists
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        // 3. Create new User
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword())); // Hash the password!

        // 4. Save to Database
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }
}
