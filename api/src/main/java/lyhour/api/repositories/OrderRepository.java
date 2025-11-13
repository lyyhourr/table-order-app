package lyhour.api.repositories;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import lyhour.api.entities.Order;
import lyhour.api.entities.OrderStatus;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @EntityGraph(attributePaths = { "orderTable", "orderItems" })
    List<Order> findAllByOrderByCreatedAtDesc();

    @Query("SELECT SUM(o.totalPrice) FROM Order o WHERE o.status = :status")
    Optional<BigDecimal> sumTotalPriceByStatus(@Param("status") OrderStatus status);

    public interface OrderStatusProjection {
        String getStatus();

        Long getValue();
    }

    @Query("SELECT o.status as status, COUNT(o) as value FROM Order o GROUP BY o.status")
    List<OrderStatusProjection> countOrdersByStatus();

}
