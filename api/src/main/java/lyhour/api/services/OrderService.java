package lyhour.api.services;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lyhour.api.commons.dtos.responses.OrderItemResponse;
import lyhour.api.commons.dtos.responses.OrderResponse;
import lyhour.api.entities.Order;
import lyhour.api.entities.OrderStatus;
import lyhour.api.repositories.MenuItemRepository;
import lyhour.api.repositories.OrderRepository;
import lyhour.api.repositories.OrderTableRepository;

@Service
public class OrderService {

        private final OrderRepository orderRepository;
        private final MenuItemRepository menuItemRepository;
        private final OrderTableRepository orderTableRepository;

        public OrderService(OrderRepository orderRepository,
                        MenuItemRepository menuItemRepository,
                        OrderTableRepository orderTableRepository) {
                this.orderRepository = orderRepository;
                this.menuItemRepository = menuItemRepository;
                this.orderTableRepository = orderTableRepository;
        }

        public List<OrderResponse> getOrdersByStatus() {
                List<Order> orders = orderRepository.findAllByOrderByCreatedAtDesc();

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

        public Map<String, Object> getDashboardSummary() {
                Map<String, Object> summary = new HashMap<>();

                BigDecimal totalIncome = orderRepository.sumTotalPriceByStatus(OrderStatus.COMPLETED)
                                .orElse(BigDecimal.ZERO);
                long totalOrders = orderRepository.count();
                long totalMenuItems = menuItemRepository.count();
                long totalTables = orderTableRepository.count();

                summary.put("totalIncome", totalIncome);
                summary.put("totalOrders", totalOrders);
                summary.put("totalMenuItems", totalMenuItems);
                summary.put("totalTables", totalTables);

                return summary;
        }
}
