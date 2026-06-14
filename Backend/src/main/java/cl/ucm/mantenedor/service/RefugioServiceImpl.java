package cl.ucm.mantenedor.service;

import cl.ucm.mantenedor.dto.in.RefugioInDTO;
import cl.ucm.mantenedor.dto.out.RefugioOutDTO;
import cl.ucm.mantenedor.entity.Refugio;
import cl.ucm.mantenedor.repository.RefugioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RefugioServiceImpl implements RefugioService {

    private final RefugioRepository refugioRepository;

    public RefugioServiceImpl(RefugioRepository refugioRepository) {
        this.refugioRepository = refugioRepository;
    }

    @Override
    public List<RefugioOutDTO> findAll() {
        return refugioRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public RefugioOutDTO findById(Long id) {
        Refugio refugio = refugioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Refugio no encontrado"));
        return mapToDTO(refugio);
    }

    @Override
    public RefugioOutDTO save(RefugioInDTO dto) {
        Refugio refugio = new Refugio();
        refugio.setNombre(dto.getNombre());
        refugio.setDireccion(dto.getDireccion());
        refugio.setTelefono(dto.getTelefono());
        
        Refugio savedRefugio = refugioRepository.save(refugio);
        return mapToDTO(savedRefugio);
    }

    @Override
    public RefugioOutDTO update(Long id, RefugioInDTO dto) {
        Refugio refugio = refugioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Refugio no encontrado"));
        
        refugio.setNombre(dto.getNombre());
        refugio.setDireccion(dto.getDireccion());
        refugio.setTelefono(dto.getTelefono());
        
        Refugio updatedRefugio = refugioRepository.save(refugio);
        return mapToDTO(updatedRefugio);
    }

    @Override
    public void delete(Long id) {
        if (!refugioRepository.existsById(id)) {
            throw new RuntimeException("Refugio no encontrado");
        }
        refugioRepository.deleteById(id);
    }

    private RefugioOutDTO mapToDTO(Refugio refugio) {
        return new RefugioOutDTO(
                refugio.getId(),
                refugio.getNombre(),
                refugio.getDireccion(),
                refugio.getTelefono()
        );
    }
}
