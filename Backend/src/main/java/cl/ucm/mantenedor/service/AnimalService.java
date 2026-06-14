package cl.ucm.mantenedor.service;

import cl.ucm.mantenedor.dto.in.AnimalInDTO;
import cl.ucm.mantenedor.dto.out.AnimalOutDTO;
import java.util.List;

public interface AnimalService {
    List<AnimalOutDTO> findAll();
    AnimalOutDTO findById(Long id);
    AnimalOutDTO save(AnimalInDTO animalInDTO);
    AnimalOutDTO update(Long id, AnimalInDTO animalInDTO);
    void delete(Long id);
}
