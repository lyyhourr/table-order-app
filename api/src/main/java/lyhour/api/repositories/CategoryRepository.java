package lyhour.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lyhour.api.commons.dtos.responses.BaseSelectDto;
import lyhour.api.entities.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<BaseSelectDto> findAllByOrderByCreatedAtDesc();
}
