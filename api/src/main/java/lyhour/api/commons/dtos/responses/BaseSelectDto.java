package lyhour.api.commons.dtos.responses;

public class BaseSelectDto {

    private final Long id;
    private final String name;

    public BaseSelectDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
