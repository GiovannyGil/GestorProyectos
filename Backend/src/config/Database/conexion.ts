import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm"
import  { DDBBConfig } from './config'
import { Usuario } from '@/modules/usuarios/entities/usuario.entity'
import { Tarea } from "@/modules/tareas/entities/tarea.entity"
import { Proyecto } from "@/modules/proyectos/entities/proyecto.entity"

const ConexionDDBB: TypeOrmModuleOptions = {
    type: 'mysql', // gestor de base de datos
    host: DDBBConfig.host, // host de la base de datos
    port: DDBBConfig.port, // puerto de la base de datos
    username: DDBBConfig.username, // usuario de la base de datos
    password: DDBBConfig.password, // contraseña de la base de datos
    database: DDBBConfig.database, // nombre de la base de datos
    entities: [Usuario, Tarea, Proyecto], // Ruta de las entidades
    synchronize: true, // para desarrollo
}


export default ConexionDDBB