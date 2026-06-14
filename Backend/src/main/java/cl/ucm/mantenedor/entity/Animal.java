package cl.ucm.mantenedor.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "animales")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String especie;

    @Column(nullable = false)
    private String raza;

    @Column(nullable = false)
    private Integer edadEstimada;

    @Column(nullable = false)
    private String tamanio;

    @Column(nullable = false)
    private String estadoSalud;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "refugio_id", nullable = false)
    private Refugio refugio;
}
