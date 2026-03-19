package com.cp317.group9.campus_cafe.service;

import com.cp317.group9.campus_cafe.model.Order;
import com.cp317.group9.campus_cafe.model.OrderItem;
import java.util.List;

public interface OrderServiceInterface {
    Order create(Order order);
    List<Order> getByCustomer(Long customerId);
    Order updateStatus(Long id, String status);
    List<Order> getAll();
    void delete(Long id);
    List<OrderItem> getItemsByOrder(Long orderId);
    void deleteOrderItem(Long orderItemId);
}
