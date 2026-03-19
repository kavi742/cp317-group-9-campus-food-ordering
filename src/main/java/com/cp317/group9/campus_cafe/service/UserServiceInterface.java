package com.cp317.group9.campus_cafe.service;

import com.cp317.group9.campus_cafe.model.User;

public interface UserServiceInterface {
    User register(User user);
    User login(String email, String password);
    void delete(Long id);
}
