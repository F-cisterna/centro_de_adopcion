package cl.ucm.mantenedor.dto.in;

import lombok.Data;
import java.time.LocalDate;

@Data
public class SeguimientoInDTO {
    private LocalDate fechaVisita;
    private String observaciones;
    private String estadoAnimal;
    private Long solicitudAdopcionId;
}
