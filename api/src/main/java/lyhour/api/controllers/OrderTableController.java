package lyhour.api.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lyhour.api.commons.dtos.requests.OrderTableDto;
import lyhour.api.commons.dtos.responses.BaseResponseDto;
import lyhour.api.commons.dtos.responses.BaseSelectDto;
import lyhour.api.entities.OrderTable;
import lyhour.api.services.OrderTableService;

@RestController
@Tag(name = "Order Tables")
@RequestMapping("/order-tables")
public class OrderTableController {

    private final OrderTableService orderTableService;

    public OrderTableController(OrderTableService orderTableService) {
        this.orderTableService = orderTableService;
    }

    @GetMapping
    public BaseResponseDto<List<OrderTable>> findAll() {
        List<OrderTable> data = orderTableService.findAll();
        return BaseResponseDto.success(data);
    };

    @GetMapping("/select")
    public BaseResponseDto<List<BaseSelectDto>> getSelect() {
        List<BaseSelectDto> data = orderTableService.getSelect();
        return BaseResponseDto.success(data, "Success");
    }

    @GetMapping("/{id}")
    public BaseResponseDto<OrderTable> findById(@PathVariable Long id) {
        OrderTable orderTable = orderTableService.findById(id);
        return BaseResponseDto.success(orderTable, "Success");
    }

    @PostMapping
    public BaseResponseDto<OrderTable> create(@RequestBody @Valid OrderTableDto orderTableDto) {
        OrderTable data = orderTableService.create(orderTableDto);
        return BaseResponseDto.success(data);
    }

    @PutMapping("/{id}")
    public BaseResponseDto<OrderTable> update(@PathVariable Long id,
            @RequestBody @Valid OrderTableDto orderTableDto) {
        OrderTable data = orderTableService.update(id, orderTableDto);
        return BaseResponseDto.success(data);
    }

    @DeleteMapping("/{id}")
    public BaseResponseDto<Void> delete(@PathVariable Long id) {
        orderTableService.delete(id);
        return BaseResponseDto.success(null, "Deleted successfully");
    }
}
