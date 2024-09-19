import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Proyecto } from './entities/proyecto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProyectosService {

  constructor(
    @InjectRepository(Proyecto)
    private readonly ProyectoREPO: Repository<Proyecto>
  ){}

  async create(createProyectoDto: CreateProyectoDto) {
    try {
      // crear el proyecto
      const proyecto = this.ProyectoREPO.create(createProyectoDto)

      // verificar si todo está bien
      if(!proyecto) throw new NotFoundException('No se pudo crear el proyecto')

      // guardar el proyecto
      const proyectoGuardado = await this.ProyectoREPO.save(proyecto)
      // retornar el proyecto
      return proyectoGuardado
    } catch (error) {
      throw new BadGatewayException(`Algo salió mal: ${error.message}`)
    }
  }

  async findAll(): Promise<Proyecto[]> {
    try {
      // buscar todos los proyectos
      const proyectos = await this.ProyectoREPO.find()
      // verificar que todo este bien
      if(!proyectos || proyectos.length === 0) throw new NotFoundException('No se pudo encontrar proyectos')
      // retornar los proyectos
      return proyectos
    } catch (error) {
      throw new BadRequestException(`Algo salió mal: ${error.message}`)
    }
  }

  async findOne(id: number): Promise<Proyecto> {
    try {
      // buscar el proyecto
      const proyecto = await this.ProyectoREPO.findOneBy({id})
      // verificar si existe
      if(!proyecto) throw new NotFoundException('No se pudo encontrar el proyecto')
      // retornar el proyecto
      return proyecto
    } catch (error) {
      throw new BadRequestException(`Algo salió mal: ${error.message}`)
    }
  }

  async update(id: number, updateProyectoDto: UpdateProyectoDto) {
    try {
      // buscar el proyecto
      const proyecto = this.findOne(id)
      // verificar si existe
      if(!proyecto) throw new NotFoundException('No se pudo encontrar el proyecto')
      // actualizar el proyecto
      const proyectoActualizado = await this.ProyectoREPO.update(id, updateProyectoDto)
      // retornar el proyecto actualizado
      return {
        message: 'Proyecto actualizado',
        proyecto: proyectoActualizado
      }
    } catch (error) {
      throw new BadRequestException(`Algo salió mal: ${error.message}`)
    }
  }

  async remove(id: number) {
    try {
      // buscar el proyecto a eliminar
      const proyecto = this.findOne(id)
      // verificar si existe
      if(!proyecto) throw new NotFoundException('No se pudo encontrar el proyecto')
      // eliminar el proyecto
      const proyectoEliminado = await this.ProyectoREPO.delete(id)
      // retornar el proyecto eliminado
      return {
        message: 'Proyecto eliminado',
        proyecto: proyectoEliminado
      }
    } catch (error) {
      throw new BadRequestException(`Algo salió mal: ${error.message}`)
    }
  }
}
