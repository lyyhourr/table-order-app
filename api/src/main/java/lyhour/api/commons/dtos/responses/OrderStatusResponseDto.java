package lyhour.api.commons.dtos.responses;

public class OrderStatusResponseDto {

    private String status;
    private Long value;

    public OrderStatusResponseDto(String status, Long value) {
        this.status = status;
        this.value = value;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getValue() {
        return value;
    }

    public void setValue(Long value) {
        this.value = value;
    }
}
