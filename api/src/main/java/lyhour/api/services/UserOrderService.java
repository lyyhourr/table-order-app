package lyhour.api.services;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lyhour.api.commons.dtos.requests.CreateOrderDto;
import lyhour.api.entities.MenuItem;
import lyhour.api.entities.Order;
import lyhour.api.entities.OrderItem;
import lyhour.api.entities.OrderStatus;
import lyhour.api.entities.OrderTable;
import lyhour.api.repositories.MenuItemRepository;
import lyhour.api.repositories.OrderRepository;
import lyhour.api.repositories.OrderTableRepository;

@Service
public class UserOrderService {

    private final OrderRepository orderRepository;
    private final MenuItemRepository menuItemRepository;
    private final OrderTableRepository orderTableRepository;

    public UserOrderService(
            OrderRepository orderRepository,
            MenuItemRepository menuItemRepository,
            OrderTableRepository orderTableRepository) {
        this.orderRepository = orderRepository;
        this.menuItemRepository = menuItemRepository;
        this.orderTableRepository = orderTableRepository;
    }

    @Transactional
    public Long createOrder(CreateOrderDto dto, Long tableId) {
        Order order = new Order();
        order.setStatus(OrderStatus.PENDING);

        OrderTable table = orderTableRepository.findById(tableId)
                .orElseThrow(() -> new RuntimeException("Table not found"));
        order.setOrderTable(table);

        BigDecimal total = BigDecimal.ZERO;

        for (CreateOrderDto.OrderItemDTO itemDto : dto.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Menu item not found"));

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setMenuItem(menuItem);
            orderItem.setQuantity(itemDto.getQuantity());
            orderItem.setPrice(menuItem.getPrice());

            total = total.add(orderItem.getSubTotal());
            order.getOrderItems().add(orderItem);
        }

        order.setTotalPrice(total);
        return orderRepository.save(order).getId();
    }

}
