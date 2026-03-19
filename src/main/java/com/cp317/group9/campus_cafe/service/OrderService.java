package com.cp317.group9.campus_cafe.service;

import com.cp317.group9.campus_cafe.model.Order;
import com.cp317.group9.campus_cafe.model.OrderItem;
import com.cp317.group9.campus_cafe.repository.OrderItemRepository;
import com.cp317.group9.campus_cafe.repository.OrderRepository;
import com.cp317.group9.campus_cafe.service.PaymentService;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService implements OrderServiceInterface {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final PaymentService paymentService;

    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, PaymentService paymentService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.paymentService = paymentService;
    }

    @Override
    public Order create(Order order) {
        boolean approved = paymentService.processPayment(order.getPaymentMethod(), order.getTotal());
        if (!approved) {
            throw new RuntimeException("Payment declined");
        }
        order.updateStatus("CONFIRMED");
        Order saved = orderRepository.save(order);
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                item.setOrderId(saved.getId());
                orderItemRepository.save(item);
            }
        }
        return saved;
    }

    @Override
    public List<Order> getByCustomer(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }

    @Override
    public Order updateStatus(Long id, String status) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.updateStatus(status);
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        orderItemRepository.deleteByOrderId(id);
        orderRepository.deleteById(id);
    }

    @Override
    public List<OrderItem> getItemsByOrder(Long orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }

    @Override
    public void deleteOrderItem(Long orderItemId) {
        orderItemRepository.deleteById(orderItemId);
    }
}
