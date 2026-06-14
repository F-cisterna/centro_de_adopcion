package cl.ucm.mantenedor.controller;

import cl.ucm.mantenedor.dto.in.SeguimientoInDTO;
import cl.ucm.mantenedor.dto.out.SeguimientoOutDTO;
import cl.ucm.mantenedor.service.SeguimientoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seguimientos")
@PreAuthorize("hasRole('ADMIN')")
public class SeguimientoController {

    private final SeguimientoService service;

    public SeguimientoController(SeguimientoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<SeguimientoOutDTO> createSeguimiento(@RequestBody SeguimientoInDTO dto) {
        return new ResponseEntity<>(service.createSeguimiento(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SeguimientoOutDTO> getSeguimientoById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getSeguimientoById(id));
    }

    @GetMapping
    public ResponseEntity<List<SeguimientoOutDTO>> getAllSeguimientos() {
        return ResponseEntity.ok(service.getAllSeguimientos());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SeguimientoOutDTO> updateSeguimiento(@PathVariable Long id, @RequestBody SeguimientoInDTO dto) {
        return ResponseEntity.ok(service.updateSeguimiento(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeguimiento(@PathVariable Long id) {
        service.deleteSeguimiento(id);
        return ResponseEntity.noContent().build();
    }
}
