package cl.ucm.mantenedor.dto.in;

import lombok.Data;
import java.time.LocalDate;

@Data
public class SolicitudAdopcionInDTO {
    private LocalDate fechaSolicitud;
    private String estado;
    private String observaciones;
    private Long animalId;
    private Long adoptanteId;
}
