package com.finlec.taskmanager.Utils;



import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    // Ideally, store this in application.properties, but for this assignment, hardcoding is acceptable if noted.
    // Must be at least 256 bits (32 chars) for HS256 algorithm.
    private static final String JWT_SECRET = "superSecretKeyForTaskManagerAppAssignment123!";
    private static final int JWT_EXPIRATION_MS = 86400000; // 24 hours

    private Key key() {
        return Keys.hmacShaKeyFor(JWT_SECRET.getBytes());
    }

    public String generateJwtToken(Authentication authentication) {
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + JWT_EXPIRATION_MS))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(authToken);
            return true;
        } catch (JwtException e) {
            // Log error here if needed
        }
        return false;
    }
}
