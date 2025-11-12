package lyhour.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lyhour.api.entities.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

}
