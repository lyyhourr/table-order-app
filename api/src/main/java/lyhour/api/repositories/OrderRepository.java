package lyhour.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import lyhour.api.entities.Order;
import lyhour.api.entities.OrderStatus;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @EntityGraph(attributePaths = { "orderTable", "orderItems" })
    List<Order> findByStatus(OrderStatus status);
}
