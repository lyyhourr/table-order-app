package lyhour.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import lyhour.api.commons.dtos.responses.PopularItemResponseDto;
import lyhour.api.entities.OrderItem;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    @Query("SELECT new lyhour.api.commons.dtos.responses.PopularItemResponseDto(oi.menuItem.name, SUM(oi.quantity)) " +
            "FROM OrderItem oi " +
            "GROUP BY oi.menuItem.name " +
            "ORDER BY SUM(oi.quantity) DESC")
    List<PopularItemResponseDto> findAllPopularItems();
}
