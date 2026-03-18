package com.cp317.group9.campus_cafe.repository;

import com.cp317.group9.campus_cafe.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
