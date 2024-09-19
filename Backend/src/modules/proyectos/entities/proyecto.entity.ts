import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ length: 20, nullable: false, type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    fechaCreacion: Date

    @Column({ type: "datetime", length: 20, nullable: false })
    fechaLimite: Date

    @Column({ type: "datetime", length: 20, nullable: false })
    fechaCompletado: Date

    @Column({ type: "boolean", length: 20, nullable: false, default: false})
    estado: boolean

    @Column({ type: "boolean", nullable: false, default: false })
    invitados: boolean

    @Column({ type: "varchar", length: 20, nullable: true })
    NombreInvitados: string

    @Column({ type: "int", nullable: false })
    usuarioId: number

    @Column({ type: "int", nullable: false })
    tareaId: number
}
