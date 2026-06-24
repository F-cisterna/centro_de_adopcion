package cl.ucm.mantenedor.controller;

import cl.ucm.mantenedor.dto.out.AdoptanteOutDTO;
import cl.ucm.mantenedor.service.AdoptanteService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/adoptantes-user")
@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
public class AdoptanteUserController {

    private final AdoptanteService service;

    public AdoptanteUserController(AdoptanteService service) {
        this.service = service;
    }

    @GetMapping("/buscar/rut/{rut}")
    public ResponseEntity<AdoptanteOutDTO> getAdoptanteByRut(@PathVariable String rut) {
        return ResponseEntity.ok(service.getAdoptanteByRut(rut));
    }
}
