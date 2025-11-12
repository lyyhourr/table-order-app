package lyhour.api.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lyhour.api.commons.dtos.responses.OrderItemResponse;
import lyhour.api.commons.dtos.responses.OrderResponse;
import lyhour.api.entities.Order;
import lyhour.api.entities.OrderStatus;
import lyhour.api.repositories.OrderRepository;

@Service
public class OrderService {

        private final OrderRepository orderRepository;

        public OrderService(OrderRepository orderRepository) {
                this.orderRepository = orderRepository;
        }

        public List<OrderResponse> getOrdersByStatus(OrderStatus status) {
                List<Order> orders = orderRepository.findByStatus(status);

                return orders.stream()
                                .map(order -> new OrderResponse(
                                                order.getId(),
                                                order.getOrderTable() != null ? order.getOrderTable().getName() : null,
                                                order.getStatus().name(),
                                                order.getTotalPrice(),
                                                order.getCreatedAt(),
                                                order.getOrderItems().stream()
                                                                .map(item -> new OrderItemResponse(
                                                                                item.getMenuItem().getName(),
                                                                                item.getQuantity(),
                                                                                item.getSubTotal()))
                                                                .collect(Collectors.toList())))
                                .collect(Collectors.toList());
        }

        @Transactional
        public Optional<OrderResponse> updateOrderStatus(Long orderId, OrderStatus newStatus) {
                return orderRepository.findById(orderId)
                                .map(order -> {
                                        order.setStatus(newStatus);
                                        Order updated = orderRepository.save(order);

                                        return new OrderResponse(
                                                        updated.getId(),
                                                        updated.getOrderTable() != null
                                                                        ? updated.getOrderTable().getName()
                                                                        : null,
                                                        updated.getStatus().name(),
                                                        updated.getTotalPrice(),
                                                        updated.getCreatedAt(),
                                                        updated.getOrderItems().stream()
                                                                        .map(i -> new OrderItemResponse(
                                                                                        i.getMenuItem().getName(),
                                                                                        i.getQuantity(),
                                                                                        i.getSubTotal()))
                                                                        .collect(Collectors.toList()));
                                });
        }
}
