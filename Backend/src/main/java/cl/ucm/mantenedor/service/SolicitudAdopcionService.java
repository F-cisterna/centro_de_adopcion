package cl.ucm.mantenedor.service;

import cl.ucm.mantenedor.dto.in.SolicitudAdopcionInDTO;
import cl.ucm.mantenedor.dto.out.SolicitudAdopcionOutDTO;
import java.util.List;

public interface SolicitudAdopcionService {
    SolicitudAdopcionOutDTO createSolicitud(SolicitudAdopcionInDTO dto);
    SolicitudAdopcionOutDTO getSolicitudById(Long id);
    List<SolicitudAdopcionOutDTO> getAllSolicitudes();
    SolicitudAdopcionOutDTO updateSolicitud(Long id, SolicitudAdopcionInDTO dto);
    void deleteSolicitud(Long id);
}
