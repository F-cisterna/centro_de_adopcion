package cl.ucm.mantenedor.service;

import cl.ucm.mantenedor.dto.in.AdoptanteInDTO;
import cl.ucm.mantenedor.dto.in.RegisterRequestDto;
import cl.ucm.mantenedor.dto.out.AdoptanteOutDTO;
import cl.ucm.mantenedor.entity.Adoptante;
import cl.ucm.mantenedor.repository.AdoptanteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdoptanteServiceImpl implements AdoptanteService {

    private final AdoptanteRepository repository;
    private final AuthService authService;


    public AdoptanteServiceImpl(AdoptanteRepository repository, AuthService authService) {
        this.repository = repository;
        this.authService = authService;
    }

    @Override
    @Transactional
    public AdoptanteOutDTO createAdoptante(AdoptanteInDTO dto) {

        // 4. PASO A: Crear la cuenta de seguridad para el login
        RegisterRequestDto accountDto = new RegisterRequestDto();
        accountDto.setUsername(dto.getRut());
        accountDto.setPassword(dto.getRut());
        accountDto.setEmail(dto.getEmail());
        accountDto.setRol("ROLE_USER");

        authService.register(accountDto);

        // 5. PASO B: Crear el registro de adoptante
        Adoptante adoptante = new Adoptante();
        adoptante.setNombreCompleto(dto.getNombreCompleto());
        adoptante.setRut(dto.getRut());
        adoptante.setEmail(dto.getEmail());
        adoptante.setTelefono(dto.getTelefono());

        return toDTO(repository.save(adoptante));
    }

    @Override
    public AdoptanteOutDTO getAdoptanteById(Long id) {
        return repository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Adoptante no encontrado con id: " + id));
    }

    @Override
    public List<AdoptanteOutDTO> getAllAdoptantes() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public AdoptanteOutDTO updateAdoptante(Long id, AdoptanteInDTO dto) {
        Adoptante adoptante = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Adoptante no encontrado con id: " + id));
        adoptante.setNombreCompleto(dto.getNombreCompleto());
        adoptante.setRut(dto.getRut());
        adoptante.setEmail(dto.getEmail());
        adoptante.setTelefono(dto.getTelefono());

        return toDTO(repository.save(adoptante));
    }

    @Override
    public void deleteAdoptante(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Adoptante no encontrado con id: " + id);
        }
        repository.deleteById(id);
    }

    private AdoptanteOutDTO toDTO(Adoptante adoptante) {
        AdoptanteOutDTO dto = new AdoptanteOutDTO();
        dto.setId(adoptante.getId());
        dto.setNombreCompleto(adoptante.getNombreCompleto());
        dto.setRut(adoptante.getRut());
        dto.setEmail(adoptante.getEmail());
        dto.setTelefono(adoptante.getTelefono());
        return dto;
    }
}