package com.cp317.group9.campus_cafe.service;

import com.cp317.group9.campus_cafe.model.User;
import com.cp317.group9.campus_cafe.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void testRegisterSetsDefaultRole() {
        User user = new User();
        user.setName("Alice");
        user.setEmail("alice@school.ca");
        user.setPassword("pass123");

        when(userRepository.save(user)).thenReturn(user);

        User result = userService.register(user);

        assertEquals("CUSTOMER", result.getRole());
    }

    @Test
    void testLoginSuccess() {
        User user = new User();
        user.setEmail("alice@school.ca");
        user.setPassword("pass123");

        when(userRepository.findByEmail("alice@school.ca")).thenReturn(user);

        User result = userService.login("alice@school.ca", "pass123");

        assertNotNull(result);
        assertEquals("alice@school.ca", result.getEmail());
    }

    @Test
    void testLoginWrongPassword() {
        User user = new User();
        user.setEmail("alice@school.ca");
        user.setPassword("pass123");

        when(userRepository.findByEmail("alice@school.ca")).thenReturn(user);

        User result = userService.login("alice@school.ca", "wrongpassword");

        assertNull(result);
    }

    @Test
    void testLoginUserNotFound() {
        when(userRepository.findByEmail("nobody@school.ca")).thenReturn(null);

        User result = userService.login("nobody@school.ca", "pass123");

        assertNull(result);
    }
}
