package lyhour.api.commons.dtos.responses;

import java.math.BigDecimal;

public class OrderItemResponse {
    private String menuItemName;
    private Integer quantity;
    private BigDecimal subTotal;

    public OrderItemResponse(String menuItemName, Integer quantity, BigDecimal subTotal) {
        this.menuItemName = menuItemName;
        this.quantity = quantity;
        this.subTotal = subTotal;
    }

    public String getMenuItemName() {
        return menuItemName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public BigDecimal getSubTotal() {
        return subTotal;
    }
}
