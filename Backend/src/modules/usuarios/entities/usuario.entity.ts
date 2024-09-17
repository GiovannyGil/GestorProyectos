import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { BadRequestException } from "@nestjs/common";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique: true, type: "varchar", length: 100, nullable: false})
    uuid: string;

    @BeforeInsert()
    async createUUID() { this.uuid = Math.random().toString(36).substring(2)}
    @Column({type: "varchar", length: 50, nullable: false})
    nombres: string;

    @Column({type: "varchar", length: 50, nullable: false})
    apellidos: string;

    @Column({unique: true, type: "varchar", length: 20, nullable: false})
    nombreUsuario: string;

    @Column({unique: true, type: "varchar", length: 15, nullable: false})
    documento: string;

    @Column({unique: true, type: "varchar", length: 30, nullable: false})
    correo: string;
    
    @Column({type: "varchar", length: 100, nullable: false})
    clave: string;
    @BeforeInsert()
    @BeforeUpdate()
    async encriptarClave() {
        try {
          const saltos = 10
          const salt = await bcrypt.genSalt(saltos);
          this.clave = await bcrypt.hash(this.clave, salt)
        } catch (error) {
          throw new BadRequestException('LA CLAVE NO SE PUDO ENCRIPTAR')
        }
      }
    
    @Column({type: "date", nullable: false})
    fechaNacimiento: Date;

    @Column({unique: true, type: 'varchar', nullable: false, length: 20})
    celular: string;

    @Column({type: 'varchar', length: 20, nullable: false})
    ciudad: string;

    @Column({type: 'varchar', length: 20, nullable: false})
    pais: string;

    @Column({type: "date", nullable: false})
    createdAt: Date;

    @Column({type: "date", nullable: true})
    updatedAt: Date;

    @Column({type: "date", nullable: true})
    deletedAt: Date;
}
