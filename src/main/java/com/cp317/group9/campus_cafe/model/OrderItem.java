package com.cp317.group9.campus_cafe.model;

import jakarta.persistence.*;

@Entity
public class OrderItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long orderId;
    private Long menuItemId;
    private int quantity;
    private double priceAtPurchase;

    public Long getId() { return id; }
    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
    public Long getMenuItemId() { return menuItemId; }
    public void setMenuItemId(Long menuItemId) { this.menuItemId = menuItemId; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public double getPriceAtPurchase() { return priceAtPurchase; }
    public void setPriceAtPurchase(double priceAtPurchase) { this.priceAtPurchase = priceAtPurchase; }
}
