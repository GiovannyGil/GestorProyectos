import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Post()
  async create(@Body() createTareaDto: CreateTareaDto) {
    try {
      return await this.tareasService.create(createTareaDto);
    } catch (error) {
      throw new BadRequestException(`Algo salió mal ${error.message}`)
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.tareasService.findAll();
    } catch (error) {
      throw new BadRequestException(`Algo salió mal ${error.message}`)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
   try {
     return await this.tareasService.findOne(+id);
   } catch (error) {
      throw new BadRequestException(`Algo salió mal ${error.message}`)
   }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTareaDto: UpdateTareaDto) {
    try {
      return await this.tareasService.update(+id, updateTareaDto);
    } catch (error) {
      throw new BadRequestException(`Algo salió mal ${error.message}`)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.tareasService.remove(+id);
    } catch (error) {
      throw new BadRequestException(`Algo salió mal ${error.message}`)
    }
  }
}
