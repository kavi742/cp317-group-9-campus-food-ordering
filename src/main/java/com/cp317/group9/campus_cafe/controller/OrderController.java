package com.cp317.group9.campus_cafe.controller;

import com.cp317.group9.campus_cafe.model.Order;
import com.cp317.group9.campus_cafe.model.OrderItem;
import com.cp317.group9.campus_cafe.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @Operation(summary="Create a new order")
    @PostMapping
    public Order create(@RequestBody Order order) {
        return orderService.create(order);
    }

    @Operation(summary="Get orders by customer id")
    @GetMapping("/customer/{customerId}")
    public List<Order> getByCustomer(@PathVariable Long customerId) {
        return orderService.getByCustomer(customerId);
    }

    @Operation(summary="Update Order Status by order id")
    @PutMapping("/{id}/status")
    public Order updateStatus(@PathVariable Long id, @RequestBody String status) {
        return orderService.updateStatus(id, status);
    }

    @Operation(summary="Get all orders")
    @GetMapping
    public List<Order> getAll() {
        return orderService.getAll();
    }

    @Operation(summary="Get all items in order by order id")
    @GetMapping("/{id}/items")
    public List<OrderItem> getItems(@PathVariable Long id) {
        return orderService.getItemsByOrder(id);
    }

    @Operation(summary="Delete an item from an order by order id and item id")
    @DeleteMapping("/{orderId}/items/{itemId}")
    public void deleteOrderItem(@PathVariable Long orderId, @PathVariable Long itemId) {
        orderService.deleteOrderItem(itemId);
    }
}
