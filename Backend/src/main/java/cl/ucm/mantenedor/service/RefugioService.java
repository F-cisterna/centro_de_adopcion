package cl.ucm.mantenedor.service;

import cl.ucm.mantenedor.dto.in.RefugioInDTO;
import cl.ucm.mantenedor.dto.out.RefugioOutDTO;
import java.util.List;

public interface RefugioService {
    List<RefugioOutDTO> findAll();
    RefugioOutDTO findById(Long id);
    RefugioOutDTO save(RefugioInDTO refugioInDTO);
    RefugioOutDTO update(Long id, RefugioInDTO refugioInDTO);
    void delete(Long id);
}
