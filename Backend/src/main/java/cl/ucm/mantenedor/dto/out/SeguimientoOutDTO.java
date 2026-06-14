package cl.ucm.mantenedor.dto.out;

import lombok.Data;
import java.time.LocalDate;

@Data
public class SeguimientoOutDTO {
    private Long id;
    private LocalDate fechaVisita;
    private String observaciones;
    private String estadoAnimal;
    private SolicitudAdopcionOutDTO solicitud;
}
