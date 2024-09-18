import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      return await this.usuariosService.create(createUsuarioDto);
    } catch (error) {
      throw new BadRequestException(`Algo salió mal ${error.message}`)
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.usuariosService.findAll();
    } catch (error) {
      throw new BadRequestException(`Algo salió mal ${error.message}`)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.usuariosService.findOne(+id);
    } catch (error) {
      throw new BadRequestException(`Algo salió mal ${error.message}`)
    }
  }

  @Get('nombreUsuario/:nombreUsuario')
  async findOneByUserName(@Param('nombreUusario') nombreUsuario: string){
    try {
      return await this.usuariosService.findByUserName(nombreUsuario)
    } catch (error) {
      throw new BadRequestException(`Algo salió mal ${error.message}`)
    }
  }

  @Get('correo/:correo')
  async findOneByEmail(@Param('correo') correo: string){
    try {
      return await this.usuariosService.findByEmail(correo)
    } catch (error) {
      throw new BadRequestException(`Algo salió mal ${error.message}`)
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    try {
      return await this.usuariosService.update(+id, updateUsuarioDto);
    } catch (error) {
      throw new BadRequestException(`Algo salió mal ${error.message}`)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.usuariosService.remove(+id);
    } catch (error) {
      throw new BadRequestException(`Algo salió mal ${error.message}`)
    }
  }
}
