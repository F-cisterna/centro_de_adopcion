package cl.ucm.mantenedor.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Table(name = "solicitudes_adopcion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SolicitudAdopcion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private LocalDate fechaSolicitud;
    
    @Column(nullable = false)
    private String estado;
    
    private String observaciones;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id", nullable = false)
    private Animal animal;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "adoptante_id", nullable = false)
    private Adoptante adoptante;
}
