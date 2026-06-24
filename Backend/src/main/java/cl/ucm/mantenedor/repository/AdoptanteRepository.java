package cl.ucm.mantenedor.repository;

import cl.ucm.mantenedor.entity.Adoptante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdoptanteRepository extends JpaRepository<Adoptante, Long> {
    Optional<Adoptante> findByRut(String rut);
}
