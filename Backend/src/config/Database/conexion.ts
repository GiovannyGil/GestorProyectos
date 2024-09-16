import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm"
import  { DDBBConfig } from './config'

const ConexionDDBB: TypeOrmModuleOptions = {
    type: 'mysql', // gestor de base de datos
    host: DDBBConfig.host, // host de la base de datos
    port: DDBBConfig.port, // puerto de la base de datos
    username: DDBBConfig.username, // usuario de la base de datos
    password: DDBBConfig.password, // contraseña de la base de datos
    database: DDBBConfig.database, // nombre de la base de datos
    entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Ruta de las entidades
    synchronize: true,
}


export default ConexionDDBB