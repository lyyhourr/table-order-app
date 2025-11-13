package lyhour.api.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import lyhour.api.commons.dtos.responses.BaseResponseDto;
import lyhour.api.commons.dtos.responses.OrderResponse;
import lyhour.api.commons.dtos.responses.OrderStatusResponseDto;
import lyhour.api.entities.OrderStatus;
import lyhour.api.services.OrderService;

@RestController
@RequestMapping("/orders")
@Tag(name = "Orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public BaseResponseDto<List<OrderResponse>> findAll() {
        List<OrderResponse> orders = orderService.getOrdersByStatus();
        return BaseResponseDto.success(orders);
    }

    @PutMapping("/{id}/status")
    public BaseResponseDto<OrderResponse> updateStatus(
            @PathVariable("id") Long id,
            @RequestParam("status") @NotNull OrderStatus newStatus) {
        return orderService.updateOrderStatus(id, newStatus)
                .map(updated -> BaseResponseDto.success(updated))
                .orElse(BaseResponseDto.fail(404, "Order not found"));
    }

    @GetMapping("/stats")
    public BaseResponseDto<Map<String, Object>> getSummary() {
        Map<String, Object> summary = orderService.getDashboardSummary();
        return BaseResponseDto.success(summary);
    }

    @GetMapping("/status-summary")
    public BaseResponseDto<List<OrderStatusResponseDto>> getOrderStatusSummary() {
        List<OrderStatusResponseDto> data = orderService.getOrderStatusCounts();
        return BaseResponseDto.success(data);
    }

}
