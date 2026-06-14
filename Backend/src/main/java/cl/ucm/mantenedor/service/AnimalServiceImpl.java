package cl.ucm.mantenedor.service;

import cl.ucm.mantenedor.dto.in.AnimalInDTO;
import cl.ucm.mantenedor.dto.out.AnimalOutDTO;
import cl.ucm.mantenedor.dto.out.RefugioOutDTO;
import cl.ucm.mantenedor.entity.Animal;
import cl.ucm.mantenedor.entity.Refugio;
import cl.ucm.mantenedor.repository.AnimalRepository;
import cl.ucm.mantenedor.repository.RefugioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnimalServiceImpl implements AnimalService {

    private final AnimalRepository animalRepository;
    private final RefugioRepository refugioRepository;

    public AnimalServiceImpl(AnimalRepository animalRepository, RefugioRepository refugioRepository) {
        this.animalRepository = animalRepository;
        this.refugioRepository = refugioRepository;
    }

    @Override
    public List<AnimalOutDTO> findAll() {
        return animalRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AnimalOutDTO findById(Long id) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Animal no encontrado"));
        return mapToDTO(animal);
    }

    @Override
    public AnimalOutDTO save(AnimalInDTO dto) {
        Refugio refugio = refugioRepository.findById(dto.getRefugioId())
                .orElseThrow(() -> new RuntimeException("Refugio no encontrado"));

        Animal animal = new Animal();
        updateAnimalFromDTO(animal, dto, refugio);
        
        Animal savedAnimal = animalRepository.save(animal);
        return mapToDTO(savedAnimal);
    }

    @Override
    public AnimalOutDTO update(Long id, AnimalInDTO dto) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Animal no encontrado"));
                
        Refugio refugio = refugioRepository.findById(dto.getRefugioId())
                .orElseThrow(() -> new RuntimeException("Refugio no encontrado"));

        updateAnimalFromDTO(animal, dto, refugio);
        
        Animal updatedAnimal = animalRepository.save(animal);
        return mapToDTO(updatedAnimal);
    }

    @Override
    public void delete(Long id) {
        if (!animalRepository.existsById(id)) {
            throw new RuntimeException("Animal no encontrado");
        }
        animalRepository.deleteById(id);
    }

    private void updateAnimalFromDTO(Animal animal, AnimalInDTO dto, Refugio refugio) {
        animal.setNombre(dto.getNombre());
        animal.setEspecie(dto.getEspecie());
        animal.setRaza(dto.getRaza());
        animal.setEdadEstimada(dto.getEdadEstimada());
        animal.setTamanio(dto.getTamanio());
        animal.setEstadoSalud(dto.getEstadoSalud());
        animal.setRefugio(refugio);
    }

    private AnimalOutDTO mapToDTO(Animal animal) {
        RefugioOutDTO refugioOutDTO = new RefugioOutDTO(
                animal.getRefugio().getId(),
                animal.getRefugio().getNombre(),
                animal.getRefugio().getDireccion(),
                animal.getRefugio().getTelefono()
        );

        return new AnimalOutDTO(
                animal.getId(),
                animal.getNombre(),
                animal.getEspecie(),
                animal.getRaza(),
                animal.getEdadEstimada(),
                animal.getTamanio(),
                animal.getEstadoSalud(),
                refugioOutDTO
        );
    }
}
