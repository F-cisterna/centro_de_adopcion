package cl.ucm.mantenedor.dto.in;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RefugioInDTO {
    private String nombre;
    private String direccion;
    private String telefono;
}
