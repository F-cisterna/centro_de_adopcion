package cl.ucm.mantenedor.controller;

import cl.ucm.mantenedor.dto.in.RefugioInDTO;
import cl.ucm.mantenedor.dto.out.RefugioOutDTO;
import cl.ucm.mantenedor.service.RefugioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/refugios")
public class RefugioController {

    private final RefugioService refugioService;

    public RefugioController(RefugioService refugioService) {
        this.refugioService = refugioService;
    }

    @GetMapping
    public ResponseEntity<List<RefugioOutDTO>> getAll() {
        return ResponseEntity.ok(refugioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RefugioOutDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(refugioService.findById(id));
    }

    @PostMapping
    public ResponseEntity<RefugioOutDTO> create(@RequestBody RefugioInDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(refugioService.save(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RefugioOutDTO> update(@PathVariable Long id, @RequestBody RefugioInDTO dto) {
        return ResponseEntity.ok(refugioService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        refugioService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
