package com.example.demo.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;
import com.example.demo.security.JwtUtil;
import com.example.demo.security.CustomUserDetailsService;
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepo.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }
        user.setPassword(encoder.encode(user.getPassword()));
        userRepo.save(user);
        return ResponseEntity.ok("Registered successfully");
    }

@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User user) {
    try {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        String token = jwtUtil.generateToken(userDetails);

        // Fetch the user from the DB to get the ID
        User dbUser = userRepo.findByUsername(user.getUsername());

        return ResponseEntity.ok(Map.of(
            "token", token,
            "userId", dbUser.getId()
        ));
    } catch (BadCredentialsException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "An unexpected error occurred"));
    }
}


    @GetMapping("/profile")
    public ResponseEntity<?> profile() {
        return ResponseEntity.ok("You are authenticated!");
    }
        @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepo.findAll();
        return ResponseEntity.ok(users);
    }

    // Optional: Add user method (if needed)
    @PostMapping
    public ResponseEntity<?> addUser(@RequestBody User user) {
        if (userRepo.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }
        user.setPassword(encoder.encode(user.getPassword()));
        User savedUser = userRepo.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }
    @DeleteMapping("/{id}")
public ResponseEntity<?> deleteUser(@PathVariable Long id) {
    if (!userRepo.existsById(id)) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }
    userRepo.deleteById(id);
    return ResponseEntity.ok("User deleted successfully");
}

}
