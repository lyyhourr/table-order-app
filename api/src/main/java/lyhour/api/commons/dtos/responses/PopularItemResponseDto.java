package lyhour.api.commons.dtos.responses;

public class PopularItemResponseDto {

    private String name;
    private Long totalOrdered;

    public PopularItemResponseDto(String name, Long totalOrdered) {
        this.name = name;
        this.totalOrdered = totalOrdered;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getTotalOrdered() {
        return totalOrdered;
    }

    public void setTotalOrdered(Long totalOrdered) {
        this.totalOrdered = totalOrdered;
    }
}
