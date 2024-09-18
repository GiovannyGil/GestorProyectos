import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateTareaDto {
    @IsString()
    @IsNotEmpty()
    @Length(1,50)
    nombre: string;
    
    @IsString()
    @IsNotEmpty()
    @Length(1,200)
    descripcion: string;
    
    @IsDate()
    @IsNotEmpty()
    fechaCreacion: Date;
    
    @IsDate()
    @IsOptional()
    fechaLimite: Date;

    @IsDate()
    @IsOptional()
    fechaCompletado: Date;
    
    @IsBoolean()
    @IsOptional()
    @Length(1,50)
    estado: string;
    
    @IsNumber()
    @IsNotEmpty()
    usuarioId: number;
    
    @IsNumber()
    @IsNotEmpty()
    proyectoId: number;
}
