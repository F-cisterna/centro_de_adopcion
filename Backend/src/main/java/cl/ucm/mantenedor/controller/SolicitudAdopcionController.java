package cl.ucm.mantenedor.controller;

import cl.ucm.mantenedor.dto.in.SolicitudAdopcionInDTO;
import cl.ucm.mantenedor.dto.out.SolicitudAdopcionOutDTO;
import cl.ucm.mantenedor.service.SolicitudAdopcionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/solicitudes")
public class SolicitudAdopcionController {

    private final SolicitudAdopcionService service;

    public SolicitudAdopcionController(SolicitudAdopcionService service) {
        this.service = service;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SolicitudAdopcionOutDTO> createSolicitud(@RequestBody SolicitudAdopcionInDTO dto) {
        return new ResponseEntity<>(service.createSolicitud(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<SolicitudAdopcionOutDTO> getSolicitudById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getSolicitudById(id));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<SolicitudAdopcionOutDTO>> getAllSolicitudes() {
        return ResponseEntity.ok(service.getAllSolicitudes());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SolicitudAdopcionOutDTO> updateSolicitud(@PathVariable Long id, @RequestBody SolicitudAdopcionInDTO dto) {
        return ResponseEntity.ok(service.updateSolicitud(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteSolicitud(@PathVariable Long id) {
        service.deleteSolicitud(id);
        return ResponseEntity.noContent().build();
    }
}
