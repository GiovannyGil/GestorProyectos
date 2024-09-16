import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// importar la base de datos
import ConexionDDBB from './config/Database/conexion'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(ConexionDDBB)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
