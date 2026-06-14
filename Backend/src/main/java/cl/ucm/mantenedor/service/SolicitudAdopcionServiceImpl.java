package cl.ucm.mantenedor.service;

import cl.ucm.mantenedor.dto.in.SolicitudAdopcionInDTO;
import cl.ucm.mantenedor.dto.out.AdoptanteOutDTO;
import cl.ucm.mantenedor.dto.out.AnimalOutDTO;
import cl.ucm.mantenedor.dto.out.SolicitudAdopcionOutDTO;
import cl.ucm.mantenedor.entity.Adoptante;
import cl.ucm.mantenedor.entity.Animal;
import cl.ucm.mantenedor.entity.SolicitudAdopcion;
import cl.ucm.mantenedor.repository.AdoptanteRepository;
import cl.ucm.mantenedor.repository.AnimalRepository;
import cl.ucm.mantenedor.repository.SolicitudAdopcionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SolicitudAdopcionServiceImpl implements SolicitudAdopcionService {

    private final SolicitudAdopcionRepository repository;
    private final AnimalRepository animalRepository;
    private final AdoptanteRepository adoptanteRepository;

    public SolicitudAdopcionServiceImpl(SolicitudAdopcionRepository repository,
                                        AnimalRepository animalRepository,
                                        AdoptanteRepository adoptanteRepository) {
        this.repository = repository;
        this.animalRepository = animalRepository;
        this.adoptanteRepository = adoptanteRepository;
    }

    @Override
    public SolicitudAdopcionOutDTO createSolicitud(SolicitudAdopcionInDTO dto) {
        Animal animal = animalRepository.findById(dto.getAnimalId())
                .orElseThrow(() -> new EntityNotFoundException("Animal no encontrado"));
        Adoptante adoptante = adoptanteRepository.findById(dto.getAdoptanteId())
                .orElseThrow(() -> new EntityNotFoundException("Adoptante no encontrado"));
                
        SolicitudAdopcion sol = new SolicitudAdopcion();
        sol.setFechaSolicitud(dto.getFechaSolicitud());
        sol.setEstado(dto.getEstado());
        sol.setObservaciones(dto.getObservaciones());
        sol.setAnimal(animal);
        sol.setAdoptante(adoptante);
        
        return toDTO(repository.save(sol));
    }

    @Override
    public SolicitudAdopcionOutDTO getSolicitudById(Long id) {
        return repository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Solicitud no encontrada"));
    }

    @Override
    public List<SolicitudAdopcionOutDTO> getAllSolicitudes() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public SolicitudAdopcionOutDTO updateSolicitud(Long id, SolicitudAdopcionInDTO dto) {
        SolicitudAdopcion sol = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Solicitud no encontrada"));
                
        Animal animal = animalRepository.findById(dto.getAnimalId())
                .orElseThrow(() -> new EntityNotFoundException("Animal no encontrado"));
        Adoptante adoptante = adoptanteRepository.findById(dto.getAdoptanteId())
                .orElseThrow(() -> new EntityNotFoundException("Adoptante no encontrado"));
                
        sol.setFechaSolicitud(dto.getFechaSolicitud());
        sol.setEstado(dto.getEstado());
        sol.setObservaciones(dto.getObservaciones());
        sol.setAnimal(animal);
        sol.setAdoptante(adoptante);
        
        return toDTO(repository.save(sol));
    }

    @Override
    public void deleteSolicitud(Long id) {
        if(!repository.existsById(id)) {
            throw new EntityNotFoundException("Solicitud no encontrada");
        }
        repository.deleteById(id);
    }

    private SolicitudAdopcionOutDTO toDTO(SolicitudAdopcion sol) {
        SolicitudAdopcionOutDTO dto = new SolicitudAdopcionOutDTO();
        dto.setId(sol.getId());
        dto.setFechaSolicitud(sol.getFechaSolicitud());
        dto.setEstado(sol.getEstado());
        dto.setObservaciones(sol.getObservaciones());
        
        if (sol.getAnimal() != null) {
            AnimalOutDTO animalDTO = new AnimalOutDTO();
            animalDTO.setId(sol.getAnimal().getId());
            animalDTO.setNombre(sol.getAnimal().getNombre());
            animalDTO.setEspecie(sol.getAnimal().getEspecie());
            animalDTO.setRaza(sol.getAnimal().getRaza());
            animalDTO.setEdadEstimada(sol.getAnimal().getEdadEstimada());
            animalDTO.setTamanio(sol.getAnimal().getTamanio());
            animalDTO.setEstadoSalud(sol.getAnimal().getEstadoSalud());
            dto.setAnimal(animalDTO);
        }
        
        if (sol.getAdoptante() != null) {
            AdoptanteOutDTO adopDTO = new AdoptanteOutDTO();
            adopDTO.setId(sol.getAdoptante().getId());
            adopDTO.setNombreCompleto(sol.getAdoptante().getNombreCompleto());
            adopDTO.setRut(sol.getAdoptante().getRut());
            adopDTO.setEmail(sol.getAdoptante().getEmail());
            adopDTO.setTelefono(sol.getAdoptante().getTelefono());
            dto.setAdoptante(adopDTO);
        }
        
        return dto;
    }
}
