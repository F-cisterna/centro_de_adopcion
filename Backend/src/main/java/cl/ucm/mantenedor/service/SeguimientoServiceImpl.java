package cl.ucm.mantenedor.service;

import cl.ucm.mantenedor.dto.in.SeguimientoInDTO;
import cl.ucm.mantenedor.dto.out.AdoptanteOutDTO;
import cl.ucm.mantenedor.dto.out.AnimalOutDTO;
import cl.ucm.mantenedor.dto.out.SeguimientoOutDTO;
import cl.ucm.mantenedor.dto.out.SolicitudAdopcionOutDTO;
import cl.ucm.mantenedor.entity.Seguimiento;
import cl.ucm.mantenedor.entity.SolicitudAdopcion;
import cl.ucm.mantenedor.repository.SeguimientoRepository;
import cl.ucm.mantenedor.repository.SolicitudAdopcionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SeguimientoServiceImpl implements SeguimientoService {

    private final SeguimientoRepository repository;
    private final SolicitudAdopcionRepository solicitudRepository;

    public SeguimientoServiceImpl(SeguimientoRepository repository, SolicitudAdopcionRepository solicitudRepository) {
        this.repository = repository;
        this.solicitudRepository = solicitudRepository;
    }

    @Override
    public SeguimientoOutDTO createSeguimiento(SeguimientoInDTO dto) {
        SolicitudAdopcion sol = solicitudRepository.findById(dto.getSolicitudAdopcionId())
                .orElseThrow(() -> new EntityNotFoundException("Solicitud no encontrada"));
        
        Seguimiento seg = new Seguimiento();
        seg.setFechaVisita(dto.getFechaVisita());
        seg.setObservaciones(dto.getObservaciones());
        seg.setEstadoAnimal(dto.getEstadoAnimal());
        seg.setSolicitudAdopcion(sol);
        
        return toDTO(repository.save(seg));
    }

    @Override
    public SeguimientoOutDTO getSeguimientoById(Long id) {
        return repository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Seguimiento no encontrado"));
    }

    @Override
    public List<SeguimientoOutDTO> getAllSeguimientos() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public SeguimientoOutDTO updateSeguimiento(Long id, SeguimientoInDTO dto) {
        Seguimiento seg = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Seguimiento no encontrado"));
        SolicitudAdopcion sol = solicitudRepository.findById(dto.getSolicitudAdopcionId())
                .orElseThrow(() -> new EntityNotFoundException("Solicitud no encontrada"));
                
        seg.setFechaVisita(dto.getFechaVisita());
        seg.setObservaciones(dto.getObservaciones());
        seg.setEstadoAnimal(dto.getEstadoAnimal());
        seg.setSolicitudAdopcion(sol);
        
        return toDTO(repository.save(seg));
    }

    @Override
    public void deleteSeguimiento(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Seguimiento no encontrado");
        }
        repository.deleteById(id);
    }

    private SeguimientoOutDTO toDTO(Seguimiento seg) {
        SeguimientoOutDTO dto = new SeguimientoOutDTO();
        dto.setId(seg.getId());
        dto.setFechaVisita(seg.getFechaVisita());
        dto.setObservaciones(seg.getObservaciones());
        dto.setEstadoAnimal(seg.getEstadoAnimal());
        
        if (seg.getSolicitudAdopcion() != null) {
            SolicitudAdopcion sol = seg.getSolicitudAdopcion();
            SolicitudAdopcionOutDTO solDTO = new SolicitudAdopcionOutDTO();
            solDTO.setId(sol.getId());
            solDTO.setFechaSolicitud(sol.getFechaSolicitud());
            solDTO.setEstado(sol.getEstado());
            solDTO.setObservaciones(sol.getObservaciones());
            
            if (sol.getAnimal() != null) {
                AnimalOutDTO animalDTO = new AnimalOutDTO();
                animalDTO.setId(sol.getAnimal().getId());
                animalDTO.setNombre(sol.getAnimal().getNombre());
                animalDTO.setEspecie(sol.getAnimal().getEspecie());
                animalDTO.setRaza(sol.getAnimal().getRaza());
                animalDTO.setEdadEstimada(sol.getAnimal().getEdadEstimada());
                animalDTO.setTamanio(sol.getAnimal().getTamanio());
                animalDTO.setEstadoSalud(sol.getAnimal().getEstadoSalud());
                solDTO.setAnimal(animalDTO);
            }
            if (sol.getAdoptante() != null) {
                AdoptanteOutDTO adopDTO = new AdoptanteOutDTO();
                adopDTO.setId(sol.getAdoptante().getId());
                adopDTO.setNombreCompleto(sol.getAdoptante().getNombreCompleto());
                adopDTO.setRut(sol.getAdoptante().getRut());
                adopDTO.setEmail(sol.getAdoptante().getEmail());
                adopDTO.setTelefono(sol.getAdoptante().getTelefono());
                solDTO.setAdoptante(adopDTO);
            }
            dto.setSolicitud(solDTO);
        }
        return dto;
    }
}
