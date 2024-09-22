import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Proyecto } from './entities/proyecto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from '../tareas/entities/tarea.entity';

@Injectable()
export class ProyectosService {

  constructor(
    @InjectRepository(Proyecto)
    private readonly ProyectoREPO: Repository<Proyecto>,

    @InjectRepository(Tarea)
    private readonly TareaREPO: Repository<Tarea>
  ){}

  async create(createProyectoDto: CreateProyectoDto) {
    try {
      const {tareas, ...proyectoData} = createProyectoDto

      // crear el proyecto sin tareas inicialmente
      const proyecto = this.ProyectoREPO.create(proyectoData)
      // verificar si todo está bien
      if(!proyecto) throw new NotFoundException('No se pudo crear el proyecto')

      // si se crea tarea asociala al proyecto
      if(tareas && tareas.length > 0){ 
        const nuevasTareas = await this.TareaREPO.save(tareas.map(tarea => this.TareaREPO.create(tareas))) // guardar las tareas
        proyecto.tareas = nuevasTareas // asignar las tareas al proyecto
      }

      // guardar el proyecto
      const proyectoGuardado = await this.ProyectoREPO.save(proyecto)

      // retornar el proyecto
      return proyectoGuardado
    } catch (error) {
      throw new BadRequestException(`Algo salió mal: ${error.message}`)
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
