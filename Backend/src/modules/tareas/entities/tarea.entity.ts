import { Proyecto } from "@/modules/proyectos/entities/proyecto.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tarea {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: "varchar", length: 50, nullable: false })
    nombre: string;
    
    @Column({ type: "varchar", length: 200, nullable: false })
    descripcion: string;
    
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: false})
    fechaCreacion: Date;
    
    @Column({ type: "date", nullable: true})
    fechaLimite: Date;
    
    @Column({ type: "date", nullable: true})
    fechaCompletado: Date;
    
    @Column({ type: "boolean", nullable: true, default: false })
    estado: boolean;
    
    // relacion de muchos a muchos -> tabla intermedia
    @ManyToMany(() => Proyecto, (proyecto) => proyecto.tareas)
    proyectos: Proyecto[]
}
