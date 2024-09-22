import { Tarea } from "@/modules/tareas/entities/tarea.entity";
import { Usuario } from "@/modules/usuarios/entities/usuario.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Proyecto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 20, nullable: false })
    nombre: string

    @Column({ type: "varchar", length: 20, nullable: false })
    titulo: string

    @Column({ type: "varchar", length: 20, nullable: false })
    subtitulo: string

    @Column({ type: "varchar", length: 30, nullable: false })
    objetivo: string

    @Column({ type: "varchar", length: 20, nullable: false })
    area: string

    @Column({ type: "varchar", length: 200, nullable: false })
    descripcion: string

    @Column({ type: "varchar", length: 50, nullable: false })
    metodologia: string

    @Column({ nullable: false, type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    fechaCreacion: Date

    @Column({ type: "datetime", nullable: false })
    fechaLimite: Date

    @Column({ type: "datetime", nullable: false })
    fechaCompletado: Date

    @Column({ type: "boolean", nullable: false, default: false})
    estado: boolean

    @Column({ type: "boolean", nullable: false, default: false })
    invitados: boolean

    @Column({ type: "varchar", length: 20, nullable: true })
    nombreInvitados: string

    @ManyToOne(() => Usuario, (usuario) => usuario.proyectos)
    usuario: Usuario 

    // relacion de muchos a muchos -> tabla intermedia
    @ManyToMany(() => Tarea, (tarea) => tarea.proyectos)
    @JoinTable()
    tareas: Tarea[]
}
