package cl.ucm.mantenedor.controller;

import cl.ucm.mantenedor.dto.in.AnimalInDTO;
import cl.ucm.mantenedor.dto.out.AnimalOutDTO;
import cl.ucm.mantenedor.service.AnimalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/animales")
public class AnimalController {

    private final AnimalService animalService;

    public AnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }

    @GetMapping
    public ResponseEntity<List<AnimalOutDTO>> getAll() {
        return ResponseEntity.ok(animalService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalOutDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(animalService.findById(id));
    }

    @PostMapping
    public ResponseEntity<AnimalOutDTO> create(@RequestBody AnimalInDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(animalService.save(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnimalOutDTO> update(@PathVariable Long id, @RequestBody AnimalInDTO dto) {
        return ResponseEntity.ok(animalService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        animalService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
