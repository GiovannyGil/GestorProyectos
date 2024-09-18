import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { Tarea } from './entities/tarea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TareasService {

  constructor(
    @InjectRepository(Tarea)
    private readonly TareaREPO: Repository<Tarea>
  ){}

  create(createTareaDto: CreateTareaDto) {
    return 'This action adds a new tarea';
  }

  async findAll(): Promise<Tarea[]> {
    try {
      // buscar las tareas
      const tareas = await this.TareaREPO.find()

      // verificar si hay tareas
      if(!tareas || tareas.length === 0) throw new NotFoundException('No se pudo encontrar tareas')

      // retornar las tareas encontradas
      return tareas
    } catch (error) {
      throw new BadRequestException(`Algo salió mal ${error.message}`)
    }
  }

  async findOne(id: number): Promise<Tarea> {
    try {
      // buscar la tarea
      const tarea = await this.TareaREPO.findOneBy({id})

      // verificar si existe
      if(!tarea) throw new NotFoundException('No se pudo encontrar la tarea')

      // devolver la tarea
      return tarea
    } catch (error) {
      throw new BadRequestException(`Algo salio mal ${error.message}`)
    }
  }

  async update(id: number, updateTareaDto: UpdateTareaDto) {
    try {
      // buscar tarea a actualizar
      const tarea = await this.findOne(id)

      // verificar si existe
      if(!tarea) throw new NotFoundException('No se pudo encontrar la tarea')

      // actualizar la tarea
      const tareaActualizada = await this.TareaREPO.save({id, updateTareaDto})

      // verificar si algo sale mal
      if(!tareaActualizada) throw new NotFoundException("no se pudo actualizar la")

      // retornar mensaje de confirmación
      return {
        message: 'Tarea actualizada',
        tarea: tareaActualizada
      }
    } catch (error) {
  
    }
  }

  async remove(id: number) {
    try {
      // buscar tarea a eliminar
      const tarea = await this.findOne(id)

      // verificar si existe
      if(!tarea) throw new NotFoundException('No se pudo encontrar la tarea')

      // eliminar la tarea
      const tareaEliminada = await this.TareaREPO.remove(tarea)

      // retornar mensaje de confirmación
      return {
        message: 'Tarea eliminada',
        tarea: tareaEliminada
      }
    } catch (error) {
  
    }
  }
}
