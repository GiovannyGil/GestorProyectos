import { CreateTareaDto } from "@/modules/tareas/dto/create-tarea.dto"
import { Tarea } from "@/modules/tareas/entities/tarea.entity"
import { IsArray, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"


export class CreateProyectoDto {
    @IsString()
    @IsNotEmpty()
    @Length(1,20)
    nombre: string

    @IsString()
    @IsNotEmpty()
    @Length(1,20)
    titulo: string

    @IsString()
    @IsNotEmpty()
    @Length(1,20)
    subtitulo: string

    @IsString()
    @IsNotEmpty()
    @Length(1,30)
    objetivo: string

    @IsString()
    @IsNotEmpty()
    @Length(1,20)
    area: string

    @IsString()
    @IsNotEmpty()
    @Length(1,200)
    descripcion: string

    @IsString()
    @IsNotEmpty()
    @Length(1,50)
    metodologia: string

    @IsString()
    @IsNotEmpty()
    fechaCreacion: Date

    @IsString()
    @IsNotEmpty()
    fechaLimite: Date

    @IsString()
    @IsNotEmpty()
    fechaCompletado: Date

    @IsString()
    @IsNotEmpty()
    estado: boolean

    @IsString()
    @IsNotEmpty()
    invitados: boolean

    @IsString()
    @IsOptional()
    @Length(1,20)
    NombreInvitados?: string

    @IsString()
    @IsNotEmpty()
    usuario: number

    @IsArray()
    @IsNotEmpty()
    tareas?: CreateTareaDto[]
}
