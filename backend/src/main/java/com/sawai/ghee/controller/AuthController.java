package com.sawai.ghee.controller;

import com.sawai.ghee.dto.*;
import com.sawai.ghee.model.User;
import com.sawai.ghee.repository.UserRepository;
import com.sawai.ghee.security.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Email already registered"));
        }
        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setPhone(req.getPhone());
        user.setRole(User.Role.USER);
        userRepository.save(user);
        return buildAuthResponse(user);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest req) {
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body(ApiResponse.error("Invalid email or password"));
        }
        User user = userRepository.findByEmail(req.getEmail()).orElseThrow();
        return buildAuthResponse(user);
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> me(@AuthenticationPrincipal UserDetails principal) {
        User user = userRepository.findByEmail(principal.getUsername()).orElseThrow();
        return ResponseEntity.ok(ApiResponse.ok(toUserDto(user)));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserDto>> updateProfile(
            @RequestBody UserDto req,
            @AuthenticationPrincipal UserDetails principal) {
        User user = userRepository.findByEmail(principal.getUsername()).orElseThrow();
        if (req.getName() != null && !req.getName().isBlank()) user.setName(req.getName());
        if (req.getPhone() != null) user.setPhone(req.getPhone());
        userRepository.save(user);
        return ResponseEntity.ok(ApiResponse.ok("Profile updated", toUserDto(user)));
    }

    private ResponseEntity<ApiResponse<AuthResponse>> buildAuthResponse(User user) {
        UserDetails ud = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtUtil.generateToken(ud);
        AuthResponse resp = new AuthResponse();
        resp.setToken(token);
        resp.setUser(toUserDto(user));
        return ResponseEntity.ok(ApiResponse.ok("Success", resp));
    }

    private UserDto toUserDto(User u) {
        UserDto d = new UserDto();
        d.setId(u.getId());
        d.setName(u.getName());
        d.setEmail(u.getEmail());
        d.setPhone(u.getPhone());
        d.setRole(u.getRole().name());
        return d;
    }
}
