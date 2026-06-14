package cl.ucm.mantenedor.controller;

import cl.ucm.mantenedor.dto.in.AuthRequestDto;
import cl.ucm.mantenedor.dto.in.RegisterRequestDto;
import cl.ucm.mantenedor.dto.out.AuthResponseDto;
import cl.ucm.mantenedor.dto.out.RegisterResponseDto;
import cl.ucm.mantenedor.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody AuthRequestDto request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDto> register(@RequestBody RegisterRequestDto request) {
        return ResponseEntity.ok(authService.register(request));
    }
}
