package lyhour.api.services;

import java.util.List;

import org.springframework.stereotype.Service;

import lyhour.api.entities.User;
import lyhour.api.repositories.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;

    }

    public User create(String username, String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setPassword("********");
                    return user;
                })
                .orElse(null);
    }

}
