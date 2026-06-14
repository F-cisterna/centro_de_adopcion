package cl.ucm.mantenedor.repository;

import cl.ucm.mantenedor.entity.Refugio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefugioRepository extends JpaRepository<Refugio, Long> {
}
