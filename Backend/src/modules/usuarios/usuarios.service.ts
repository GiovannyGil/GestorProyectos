import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { existsSync } from 'fs';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private readonly UsuarioREPO: Repository<Usuario>
  ){}

  // funcion para crear o agregar un nuevo usuario
  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      // crear un nuevo usuario con la informacion del DTO
      const nuevoUsuario = this.UsuarioREPO.create(createUsuarioDto)

      // verificar si algo salio mal
      if(!nuevoUsuario) throw new NotFoundException('No se pudo crear el usuario')

      // verificar si el correo o nombre de usuario ya existe
      const existingUser = await this.UsuarioREPO.findOne({ where: [{ correo: nuevoUsuario.correo }, { nombreUsuario: nuevoUsuario.nombreUsuario }] });
      if (existingUser) throw new BadRequestException('El correo o nombre de usuario ya existe');

      // guardar el nuevo usuario
      const usuarioSave = this.UsuarioREPO.save(nuevoUsuario)

      // verificar si algo salio mal
      if(!usuarioSave) throw new NotFoundException('No se pudo guardar el usuario')
      
      // retornar el usuario guardado
      return usuarioSave
    } catch (error) {
      throw new BadRequestException(`Algo salio mal: ${error.message}`)
    }
  }

  // función para buscar u obtener todos los usuarios existentes
  async findAll(): Promise<Usuario[]> {
    try {
      // buscar los usuarios
      const usuarios = await this.UsuarioREPO.find()

      // verificar si hay usuarios
      if(!usuarios || usuarios.length === 0) throw new NotFoundException('No se pudo encontrar usuarios')
      
      // retornar los usuarios encontrados
      return usuarios
    } catch (error) {
      throw new BadRequestException(`Algo salió mal al buscar los usuarios (Services): ${error.message}`);
    }
  }

  // función para buscar un usuario en especifico mediante el id
  async findOne(id: number): Promise<Usuario> {
    try {
      // buscar el usurio
      const usuario = this.UsuarioREPO.findOneByOrFail({id})

      // verificar si hay usuario
      if(!usuario) throw new NotFoundException("usuario no encontrado o no existe");

      // retornar la informacion del usuario
      return usuario
    } catch (error) {
      throw new BadRequestException(`Algo salio mal: ${error.message}`)
    }
  }

  // función para buscar un usuario en especifico mediante el nombreUsuario
  async findByUserName(nombreUsuario: string): Promise<Usuario> {
    try {
      // buscar usuario
      const usuario = this.UsuarioREPO.findOneByOrFail({nombreUsuario})
  
      // verificar si hay usuario
      if(!usuario) throw new NotFoundException("no se puedo encontrar el usuario");
  
      // si todo esta bien, mostrar el usuario
      return usuario
    } catch (error) {
      throw new BadRequestException(`Algo salio mal: ${error.message}`)
    }
  }

  // función para buscar un usuario en especifico mediante el correo
  async findByEmail(correo: string): Promise<Usuario> {
    try {
      // buscar usuario
      const usuario = this.UsuarioREPO.findOneByOrFail({correo})
  
      // verificar si hay usuario
      if(!usuario) throw new NotFoundException("no se puedo encontrar el usuario");
  
      // si todo esta bien, mostrar el usuario
      return usuario
    } catch (error) {
      throw new BadRequestException(`Algo salio mal: ${error.message}`)
    }
  }

  // función para actualizar un usuario
  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    try {
      // buscar el usuario que se desea actualizar
      const usuario = this.findOne(id)

      // verificar si hay usuario
      if(!usuario) throw new NotFoundException("no se encontro el usuario o algo salió mal")

      // actualizar el usuario
      const usuarioActualizado = await this.UsuarioREPO.update(id, updateUsuarioDto)

      // verificar si algo sale mal
      if(!usuarioActualizado) throw new NotFoundException("no se pudo actualizar el usuario")

      // retornar el usuario actualizado
      return usuarioActualizado

    } catch (error) {
      throw new BadRequestException(`Algo salio mal: ${error.message}`)
    }
  }

  // función para eliminar un usuario
  async remove(id: number) {
    try {
      // buscar el usuario a eliminar
      const usuarioEliminar = await this.findOne(id)

      // verificar si algo sale mal
      if(!usuarioEliminar) throw new NotFoundException ("algo salio mal, no se encontró el usuario a eliminar");

      // eliminar el usuario
      const usuarioEliminado = await this.UsuarioREPO.remove(usuarioEliminar)

      // verificar si algo sale mal
      if(!usuarioEliminado) throw new NotFoundException ("algo salio mal, no se eliminó el usuario");

      return {message: "Usuario Eliminado Correctamente"}
    } catch (error) {
      throw new BadRequestException(`Algo salio mal: ${error.message}`)
    }
  }
}
