package cl.ucm.mantenedor.dto.out;

import lombok.Data;

@Data
public class AdoptanteOutDTO {
    private Long id;
    private String nombreCompleto;
    private String rut;
    private String email;
    private String telefono;
}
