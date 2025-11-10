package lyhour.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lyhour.api.commons.dtos.requests.OrderTableDto;
import lyhour.api.commons.dtos.responses.BaseSelectDto;
import lyhour.api.entities.OrderTable;
import lyhour.api.repositories.OrderTableRepository;

@Service
public class OrderTableService {

    private final OrderTableRepository orderTableRepository;

    public OrderTableService(OrderTableRepository orderTableRepository) {
        this.orderTableRepository = orderTableRepository;
    }

    public List<OrderTable> findAll() {
        return orderTableRepository.findAll(Sort
                .by(Direction.DESC, "createdAt"));
    }

    public List<BaseSelectDto> getSelect() {
        return orderTableRepository.findAllByOrderByCreatedAtDesc();
    }

    public OrderTable findById(Long id) {
        return orderTableRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("OrderTable not found with id: " + id));
    }

    public OrderTable create(OrderTableDto orderTableDto) {
        OrderTable orderTable = new OrderTable();
        orderTable.setName(orderTableDto.getName());
        orderTable.setDescription(orderTableDto.getDescription());
        return orderTableRepository.save(orderTable);
    }

    public OrderTable update(Long id, OrderTableDto orderTableDto) {
        OrderTable orderTable = orderTableRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("OrderTable not found with id: " + id));
        orderTable.setName(orderTableDto.getName());
        orderTable.setDescription(orderTableDto.getDescription());

        return orderTableRepository.save(orderTable);
    }

    public void delete(Long id) {
        OrderTable orderTable = orderTableRepository.findById(id)
                .orElseThrow(
                        () -> new EntityNotFoundException("OrderTable not found with id: " + id));
        orderTableRepository.delete(orderTable);
    }
}
