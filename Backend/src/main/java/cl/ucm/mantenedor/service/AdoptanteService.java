package cl.ucm.mantenedor.service;

import cl.ucm.mantenedor.dto.in.AdoptanteInDTO;
import cl.ucm.mantenedor.dto.out.AdoptanteOutDTO;
import java.util.List;

public interface AdoptanteService {
    AdoptanteOutDTO createAdoptante(AdoptanteInDTO dto);
    AdoptanteOutDTO getAdoptanteById(Long id);
    List<AdoptanteOutDTO> getAllAdoptantes();
    AdoptanteOutDTO updateAdoptante(Long id, AdoptanteInDTO dto);
    void deleteAdoptante(Long id);
}
