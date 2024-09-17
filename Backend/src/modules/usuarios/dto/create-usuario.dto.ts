import { IsDate, IsDateString, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";


export class CreateUsuarioDto {
    @IsOptional()
    uuid?: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    nombres: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    apellidos: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    nombreUsuario: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 15)
    documento: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 30)
    correo: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    clave: string;

    @IsDate()
    @IsNotEmpty()
    fechaNacimiento: Date;

    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    celular: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    ciudad: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    pais: string;

    @IsDate()
    @IsNotEmpty()
    createdAt: Date;
}
