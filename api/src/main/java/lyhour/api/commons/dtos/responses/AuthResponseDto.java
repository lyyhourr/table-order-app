package lyhour.api.commons.dtos.responses;

import lyhour.api.entities.User;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDto {
    private String token;
    private User user;
}
