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
    private final TelegramService telegramService;

    public UserOrderService(
            OrderRepository orderRepository,
            MenuItemRepository menuItemRepository,
            OrderTableRepository orderTableRepository,
            TelegramService telegramService) {
        this.orderRepository = orderRepository;
        this.menuItemRepository = menuItemRepository;
        this.orderTableRepository = orderTableRepository;
        this.telegramService = telegramService;
    }

    @Transactional
    public Long createOrder(CreateOrderDto dto, Long tableId) {
        Order order = new Order();
        order.setStatus(OrderStatus.PENDING);

        OrderTable table = orderTableRepository.findById(tableId)
                .orElseThrow(() -> new RuntimeException("Table not found"));
        order.setOrderTable(table);

        BigDecimal total = BigDecimal.ZERO;

        order.setTotalPrice(total);
        Order savedOrder = orderRepository.save(order);

        StringBuilder message = new StringBuilder("🍽️ <b>New Order Received</b>\n");
        message.append("<b>Order ID:</b> ").append(savedOrder.getId())
                .append("  <b>Table:</b> ").append(table.getName()).append("\n\n");

        for (CreateOrderDto.OrderItemDTO itemDto : dto.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Menu item not found"));

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setMenuItem(menuItem);
            orderItem.setQuantity(itemDto.getQuantity());
            orderItem.setPrice(menuItem.getPrice());

            total = total.add(orderItem.getSubTotal());
            savedOrder.getOrderItems().add(orderItem);

            message.append("- ").append(menuItem.getName())
                    .append(" × ").append(itemDto.getQuantity())
                    .append(" = $").append(orderItem.getSubTotal())
                    .append("\n");
        }

        savedOrder.setTotalPrice(total);
        orderRepository.save(savedOrder);

        message.append("\n💰 <b>Total Price:</b> $").append(total);

        telegramService.sendMessage(message.toString());

        return savedOrder.getId();
    }
}
