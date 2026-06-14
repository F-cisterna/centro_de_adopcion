package cl.ucm.mantenedor.dto.out;

import lombok.Data;
import java.time.LocalDate;

@Data
public class SolicitudAdopcionOutDTO {
    private Long id;
    private LocalDate fechaSolicitud;
    private String estado;
    private String observaciones;
    private AnimalOutDTO animal;
    private AdoptanteOutDTO adoptante;
}
