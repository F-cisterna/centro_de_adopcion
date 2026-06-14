package cl.ucm.mantenedor.repository;

import cl.ucm.mantenedor.entity.Seguimiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeguimientoRepository extends JpaRepository<Seguimiento, Long> {
}
