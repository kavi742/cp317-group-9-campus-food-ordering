package com.cp317.group9.campus_cafe.controller;

import com.cp317.group9.campus_cafe.model.ApiResponse;
import com.cp317.group9.campus_cafe.model.User;
import com.cp317.group9.campus_cafe.service.UserServiceInterface;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserServiceInterface userService;

    public AuthController(UserServiceInterface userService) {
        this.userService = userService;
    }

    @Operation(summary = "Register a new user")
    @PostMapping("/register")
    public ApiResponse<User> register(@RequestBody User user) {
        return ApiResponse.ok(userService.register(user));
    }

    @Operation(summary = "Login with email and password")
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<User>> login(@RequestBody User user) {
        User found = userService.login(user.getEmail(), user.getPassword());
        if (found == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Invalid email or password"));
        }
        return ResponseEntity.ok(ApiResponse.ok(found));
    }

    @Operation(summary = "Delete a user by id")
    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ApiResponse.ok(null);
    }
}
