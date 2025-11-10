package lyhour.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lyhour.api.commons.dtos.responses.BaseSelectDto;
import lyhour.api.entities.OrderTable;

@Repository
public interface OrderTableRepository extends JpaRepository<OrderTable, Long> {
    List<BaseSelectDto> findAllByOrderByCreatedAtDesc();
}
