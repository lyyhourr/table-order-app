package lyhour.api.controllers;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lyhour.api.commons.dtos.requests.CreateOrderDto;
import lyhour.api.commons.dtos.responses.BaseResponseDto;
import lyhour.api.services.OrderTableService;
import lyhour.api.services.UserOrderService;

@RestController
@RequestMapping("/user-orders")
@Tag(name = "User Orders")
public class UserOrderController {

    private final UserOrderService userOrderService;
    private final OrderTableService orderTableService;

    public UserOrderController(UserOrderService userOrderService, OrderTableService orderTableService) {
        this.userOrderService = userOrderService;
        this.orderTableService = orderTableService;
    }

    @PostMapping("/{tableId}")
    public BaseResponseDto<Map<String, Long>> placeOrder(
            @PathVariable Long tableId,
            @RequestBody CreateOrderDto dto) {
        Long result = userOrderService.createOrder(dto, tableId);
        return BaseResponseDto.<Map<String, Long>>success(Map.of("id", result), "Order created successfully");
    }

    @GetMapping("/tables")
    public BaseResponseDto<Object> getAllTables() {
        return BaseResponseDto.success(orderTableService.findAll());
    }

    @GetMapping("/tables/{tableId}")
    public BaseResponseDto<Object> getOneTable(@PathVariable("tableId") Long tableId) {
        return BaseResponseDto.success(orderTableService.findById(tableId));
    }

}
