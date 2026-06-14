package cl.ucm.mantenedor.dto.out;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnimalOutDTO {
    private Long id;
    private String nombre;
    private String especie;
    private String raza;
    private Integer edadEstimada;
    private String tamanio;
    private String estadoSalud;
    private RefugioOutDTO refugio;
}
