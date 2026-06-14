package cl.ucm.mantenedor.service;

import cl.ucm.mantenedor.dto.in.AuthRequestDto;
import cl.ucm.mantenedor.dto.in.RegisterRequestDto;
import cl.ucm.mantenedor.dto.out.AuthResponseDto;
import cl.ucm.mantenedor.dto.out.RegisterResponseDto;

public interface AuthService {
    AuthResponseDto login(AuthRequestDto request);
    RegisterResponseDto register(RegisterRequestDto request);
}
