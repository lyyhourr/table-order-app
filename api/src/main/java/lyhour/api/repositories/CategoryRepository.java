package lyhour.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import lyhour.api.entities.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
