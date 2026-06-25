package cl.ucm.mantenedor.service;

import cl.ucm.mantenedor.dto.in.AuthRequestDto;
import cl.ucm.mantenedor.dto.in.RegisterRequestDto;
import cl.ucm.mantenedor.dto.out.AuthResponseDto;
import cl.ucm.mantenedor.dto.out.RegisterResponseDto;
import cl.ucm.mantenedor.entity.Role;
import cl.ucm.mantenedor.entity.User;
import cl.ucm.mantenedor.repository.RoleRepository;
import cl.ucm.mantenedor.repository.UserRepository;
import cl.ucm.mantenedor.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserRepository userRepository, RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager,
                           JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public AuthResponseDto login(AuthRequestDto request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        List<String> roles = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        String token = jwtUtil.generateToken(user.getUsername(), roles);
        
        String principalRole = roles.isEmpty() ? "" : roles.get(0);
        
        return new AuthResponseDto(user.getUsername(), user.getEmail(), principalRole, token);
    }

    @Override
    public RegisterResponseDto register(RegisterRequestDto request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("El username ya está en uso");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        String roleName = request.getRol() != null && !request.getRol().isEmpty() ? request.getRol() : "ROLE_USER";
        Role role = roleRepository.findByName(roleName)
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setName(roleName);
                    return roleRepository.save(newRole);
                });

        user.getRoles().add(role);
        User savedUser = userRepository.save(user);

        List<String> roleNames = savedUser.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        return new RegisterResponseDto(savedUser.getId(), savedUser.getEmail(), roleNames);
    }
}
