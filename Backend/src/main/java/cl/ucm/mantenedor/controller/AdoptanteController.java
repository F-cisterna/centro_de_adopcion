package cl.ucm.mantenedor.controller;

import cl.ucm.mantenedor.dto.in.AdoptanteInDTO;
import cl.ucm.mantenedor.dto.out.AdoptanteOutDTO;
import cl.ucm.mantenedor.service.AdoptanteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adoptantes")
@PreAuthorize("hasRole('ADMIN')")
public class AdoptanteController {

    private final AdoptanteService service;

    public AdoptanteController(AdoptanteService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<AdoptanteOutDTO> createAdoptante(@RequestBody AdoptanteInDTO dto) {
        return new ResponseEntity<>(service.createAdoptante(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdoptanteOutDTO> getAdoptanteById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAdoptanteById(id));
    }

    @GetMapping
    public ResponseEntity<List<AdoptanteOutDTO>> getAllAdoptantes() {
        return ResponseEntity.ok(service.getAllAdoptantes());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdoptanteOutDTO> updateAdoptante(@PathVariable Long id, @RequestBody AdoptanteInDTO dto) {
        return ResponseEntity.ok(service.updateAdoptante(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdoptante(@PathVariable Long id) {
        service.deleteAdoptante(id);
        return ResponseEntity.noContent().build();
    }
}
