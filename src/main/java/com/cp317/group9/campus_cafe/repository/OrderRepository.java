package com.cp317.group9.campus_cafe.repository;

import com.cp317.group9.campus_cafe.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomerId(Long customerId);
}
