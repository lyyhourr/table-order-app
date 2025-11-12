package lyhour.api.commons.dtos.responses;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderResponse {
    private Long id;
    private String tableName;
    private String status;
    private BigDecimal totalPrice;
    private LocalDateTime createdAt;
    private List<OrderItemResponse> orderItems;

    public OrderResponse(Long id, String tableName, String status, BigDecimal totalPrice,
            LocalDateTime createdAt, List<OrderItemResponse> orderItems) {
        this.id = id;
        this.tableName = tableName;
        this.status = status;
        this.totalPrice = totalPrice;
        this.createdAt = createdAt;
        this.orderItems = orderItems;
    }

    public Long getId() {
        return id;
    }

    public String getTableName() {
        return tableName;
    }

    public String getStatus() {
        return status;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public List<OrderItemResponse> getOrderItems() {
        return orderItems;
    }
}
