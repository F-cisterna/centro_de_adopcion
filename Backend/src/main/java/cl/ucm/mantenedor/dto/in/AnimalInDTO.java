package cl.ucm.mantenedor.dto.in;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnimalInDTO {
    private String nombre;
    private String especie;
    private String raza;
    private Integer edadEstimada;
    private String tamanio;
    private String estadoSalud;
    private Long refugioId;
}
