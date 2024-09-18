import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Proyecto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 20, nullable: false })
    nombre: string

    @Column({ type: "varchar", length: 20, nullable: false })
    descripcion: string

    @Column({ length: 20, nullable: false, type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    fechaCreacion: Date

    @Column({ type: "date", length: 20, nullable: false })
    fechaLimite: Date

    @Column({ type: "date", length: 20, nullable: false })
    fechaCompletado: Date

    @Column({ type: "boolean", length: 20, nullable: false, default: false})
    estado: boolean

    @Column({ type: "int", nullable: false })
    usuarioId: number

    @Column({ type: "int", nullable: false })
    tareaId: number
}
