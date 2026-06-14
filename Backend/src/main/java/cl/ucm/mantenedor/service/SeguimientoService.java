package cl.ucm.mantenedor.service;

import cl.ucm.mantenedor.dto.in.SeguimientoInDTO;
import cl.ucm.mantenedor.dto.out.SeguimientoOutDTO;
import java.util.List;

public interface SeguimientoService {
    SeguimientoOutDTO createSeguimiento(SeguimientoInDTO dto);
    SeguimientoOutDTO getSeguimientoById(Long id);
    List<SeguimientoOutDTO> getAllSeguimientos();
    SeguimientoOutDTO updateSeguimiento(Long id, SeguimientoInDTO dto);
    void deleteSeguimiento(Long id);
}
