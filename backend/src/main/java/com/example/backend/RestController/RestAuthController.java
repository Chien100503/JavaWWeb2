package com.example.backend.RestController;

import com.example.backend.Auth.JwtService;
import com.example.backend.Model.RoleModel;
import com.example.backend.Model.UserModel;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.HashSet;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@RestController
public class RestAuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/api/v1/register")
    public ResponseEntity<?> processRegister(@RequestBody UserModel user) {
        // Check if username already exists
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already in use!");
        }

        // Encode password
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        RoleModel userRole = roleRepository.findByName("USER");
        if (userRole == null) {
            userRole = new RoleModel("USER"); // Create new role if it doesn't exist
            roleRepository.save(userRole); // Persist the role
        }

        // Initialize roles set if null and add the role
        if (user.getRoles() == null) {
            user.setRoles(new HashSet<>());
        }
        user.getRoles().add(userRole);
        userRepository.save(user);

        // Return a success response
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successful!.");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/api/v1/login")
    public ResponseEntity<?> signin(@RequestBody Map<String, String> signInRequest) {
        try {
            // Extract username and password from the request body
            String username = signInRequest.get("username");
            String password = signInRequest.get("password");

            // Authenticate the user using their credentials
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            // Fetch the authenticated user's roles
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();

            String token = jwtService.generateToken(username);

            // Build a response map with roles and token
            Map<String, Object> response = new HashMap<>();
            response.put("username", userDetails.getUsername());
            response.put("message", "Sign in successful!");
            response.put("token", token);
            response.put("roles", authorities.stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList()));

            return ResponseEntity.ok(response);

        } catch (AuthenticationException e) {
            // Handle authentication failure
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
        }
    }

}
