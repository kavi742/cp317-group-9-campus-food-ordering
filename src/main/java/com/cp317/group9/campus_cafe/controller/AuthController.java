package com.cp317.group9.campus_cafe.controller;

import com.cp317.group9.campus_cafe.model.User;
import com.cp317.group9.campus_cafe.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }


    @Operation(summary="Create a new user")
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User saved = userService.register(user);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        User found = userService.login(user.getEmail(), user.getPassword());
        if (found == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(found);
    }

    @Operation(summary="Delete a user by user id")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}
