package com.cp317.group9.campus_cafe.controller;

import com.cp317.group9.campus_cafe.model.ApiResponse;
import com.cp317.group9.campus_cafe.model.Order;
import com.cp317.group9.campus_cafe.model.OrderItem;
import com.cp317.group9.campus_cafe.service.OrderServiceInterface;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderServiceInterface orderService;

    public OrderController(OrderServiceInterface orderService) {
        this.orderService = orderService;
    }

    @Operation(summary = "Create a new order")
    @PostMapping
    public ResponseEntity<ApiResponse<?>> create(@RequestBody Order order) {
        try {
            Order saved = orderService.create(order);
            return ResponseEntity.ok(ApiResponse.ok(saved));
        } catch (RuntimeException e) {
            return ResponseEntity.status(402).body(ApiResponse.error("Payment declined"));
        }
    }

    @Operation(summary = "Get orders by customer id")
    @GetMapping("/customer/{customerId}")
    public ApiResponse<List<Order>> getByCustomer(@PathVariable Long customerId) {
        return ApiResponse.ok(orderService.getByCustomer(customerId));
    }

    @Operation(summary = "Update order status by order id")
    @PutMapping("/{id}/status")
    public ApiResponse<Order> updateStatus(@PathVariable Long id, @RequestBody String status) {
        return ApiResponse.ok(orderService.updateStatus(id, status));
    }

    @Operation(summary = "Get all orders")
    @GetMapping
    public ApiResponse<List<Order>> getAll() {
        return ApiResponse.ok(orderService.getAll());
    }

    @Operation(summary = "Get all items in order by order id")
    @GetMapping("/{id}/items")
    public ApiResponse<List<OrderItem>> getItems(@PathVariable Long id) {
        return ApiResponse.ok(orderService.getItemsByOrder(id));
    }

    @Operation(summary = "Delete an order by id")
    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        orderService.delete(id);
        return ApiResponse.ok(null);
    }

    @Operation(summary = "Delete an item from an order by order id and item id")
    @DeleteMapping("/{orderId}/items/{itemId}")
    public ApiResponse<Void> deleteOrderItem(@PathVariable Long orderId, @PathVariable Long itemId) {
        orderService.deleteOrderItem(itemId);
        return ApiResponse.ok(null);
    }
}
