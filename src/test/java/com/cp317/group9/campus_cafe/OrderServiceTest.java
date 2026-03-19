package com.cp317.group9.campus_cafe.service;

import com.cp317.group9.campus_cafe.model.Order;
import com.cp317.group9.campus_cafe.repository.OrderItemRepository;
import com.cp317.group9.campus_cafe.repository.OrderRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private OrderItemRepository orderItemRepository;

    @InjectMocks
    private OrderService orderService;

    @Test
    void testCreateSetsStatusAndTime() {
        Order order = new Order();
        order.setCustomerId(1L);
        order.setTotal(5.00);

        when(orderRepository.save(order)).thenReturn(order);

        Order result = orderService.create(order);

        assertEquals("CONFIRMED", result.getStatus());
        assertNotNull(result.getCreatedAt());
    }

    @Test
    void testGetByCustomer() {
        Order order = new Order();
        order.setCustomerId(1L);

        when(orderRepository.findByCustomerId(1L)).thenReturn(List.of(order));

        List<Order> result = orderService.getByCustomer(1L);

        assertEquals(1, result.size());
        assertEquals(1L, result.get(0).getCustomerId());
    }

    @Test
    void testUpdateStatus() {
        Order order = new Order();
        order.setStatus("CONFIRMED");

        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));
        when(orderRepository.save(order)).thenReturn(order);

        Order result = orderService.updateStatus(1L, "PREPARING");

        assertEquals("PREPARING", result.getStatus());
    }

    @Test
    void testDelete() {
        orderService.delete(1L);
        verify(orderItemRepository, times(1)).deleteByOrderId(1L);
        verify(orderRepository, times(1)).deleteById(1L);
    }
}
