package com.cp317.group9.campus_cafe.service;

import com.cp317.group9.campus_cafe.model.Order;
import com.cp317.group9.campus_cafe.model.OrderItem;
import com.cp317.group9.campus_cafe.repository.OrderItemRepository;
import com.cp317.group9.campus_cafe.repository.OrderRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    public Order create(Order order) {
        order.setStatus("CONFIRMED");
        order.setCreatedAt(LocalDateTime.now());
        Order saved = orderRepository.save(order);

        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                item.setOrderId(saved.getId());
                orderItemRepository.save(item);
            }
        }

        return saved;
    }

    public List<Order> getByCustomer(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }

    public Order updateStatus(Long id, String status) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.setStatus(status);
        return orderRepository.save(order);
    }

    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    public List<OrderItem> getItemsByOrder(Long orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }

    public void delete(Long id) {
        orderItemRepository.deleteByOrderId(id);
        orderRepository.deleteById(id);
    }

    public void deleteOrderItem(Long orderItemId) {
        orderItemRepository.deleteById(orderItemId);
    }
}
