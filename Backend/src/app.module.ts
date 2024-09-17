import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// importar la base de datos
import ConexionDDBB from './config/Database/conexion'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { TareasModule } from './modules/tareas/tareas.module';
import { ProyectosModule } from './modules/proyectos/proyectos.module';

@Module({
  imports: [TypeOrmModule.forRoot(ConexionDDBB), AuthModule, UsuariosModule, TareasModule, ProyectosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
