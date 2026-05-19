
import {Router} from 'express'
import { actualizarAula, actualizarEvento, actualizarOficina, actualizarPasswordAdmin, actualizarPerfilAdmin, comprobarTokenPasswordAdmin, crearAulas, crearEvento, crearNuevoPasswordAdmin, crearOficinas, eliminarAula, eliminarDocente, eliminarEstudiante, eliminarEvento, eliminarOficina, listarAulas, listarDocentes, listarEstudiantes, listarEventos, listarOficinas, loginAdmin, perfilAdmin, recuperarPasswordAdmin, registroAdmin, verAula, verDocente, verEstudiante, verEvento, verOficina } from '../controllers/admin_controllers.js'
import { verificarTokenJWT } from '../middlewares/JWT.js'
import { uploadExcel } from '../controllers/upload_controllers.js'
import { actualizarPerfilDocente } from '../controllers/docente_controllers.js'
import { actualizarPerfilEstudiante } from '../controllers/estudiante_controllers.js'


const routerAdmins= Router()

//REGISTRO Y AUTENTICACIÓN
routerAdmins.post('/admin/registro',registroAdmin)
routerAdmins.post('/admin/recuperarpassword',recuperarPasswordAdmin)
routerAdmins.get('/admin/recuperarpassword/:token',comprobarTokenPasswordAdmin)  
routerAdmins.post('/admin/nuevopassword/:token',crearNuevoPasswordAdmin)
//AUTENTICACIÓN

routerAdmins.post('/admin/login',loginAdmin) 
routerAdmins.get('/admin/perfil',verificarTokenJWT,perfilAdmin)
routerAdmins.put('/admin/actualizarperfil/:id',verificarTokenJWT,actualizarPerfilAdmin)
routerAdmins.put('/admin/actualizarpassword/:id',verificarTokenJWT,actualizarPasswordAdmin)

//EVENTOS
routerAdmins.post('/admin/evento',crearEvento)
routerAdmins.put('/admin/actualizarevento/:id',actualizarEvento)
routerAdmins.delete('/admin/eliminarevento/:id',eliminarEvento)
routerAdmins.get('/eventos',listarEventos)
routerAdmins.get('/verevento/:id',verificarTokenJWT,verEvento)

//OFICINAS
routerAdmins.post('/admin/oficina',verificarTokenJWT,crearOficinas)
routerAdmins.get('/oficinas',verificarTokenJWT,listarOficinas)
routerAdmins.get('/veroficina/:id',verificarTokenJWT,verOficina)
routerAdmins.put('/admin/actualizaroficina/:id',verificarTokenJWT,actualizarOficina)
routerAdmins.delete('/admin/eliminaroficina/:id',verificarTokenJWT,eliminarOficina)
routerAdmins.get('/admin/oficinas',listarOficinas)
//AULAS
routerAdmins.post('/admin/aula',verificarTokenJWT,crearAulas)
routerAdmins.get('/aulas',verificarTokenJWT,listarAulas)
routerAdmins.get('/veraula/:id',verificarTokenJWT,verAula)
routerAdmins.put('/admin/actualizaraula/:id',verificarTokenJWT,actualizarAula)
routerAdmins.delete('/admin/eliminaraula/:id',verificarTokenJWT,eliminarAula)
routerAdmins.get('/aulas',listarAulas)
//ESTUDIANTES
routerAdmins.get('/estudiantes',listarEstudiantes)
routerAdmins.get('/verestudiante/:id',verificarTokenJWT,verEstudiante)
routerAdmins.delete('/admin/eliminarEstudiante/:id',verificarTokenJWT,eliminarEstudiante)
routerAdmins.put('/admin/actualizarEstudiante/:id',verificarTokenJWT,actualizarPerfilEstudiante)

//DOCENTES
routerAdmins.get('/docentes',verificarTokenJWT,listarDocentes)
routerAdmins.get('/verdocente/:id',verificarTokenJWT,verDocente)
routerAdmins.delete('/admin/eliminardocente/:id',verificarTokenJWT,eliminarDocente)
routerAdmins.put('/admin/actualizarPerfilDocente/:id',verificarTokenJWT,actualizarPerfilDocente)    
routerAdmins.get('/docentes',listarDocentes)
//CARGA MASIVA DE DOCENTES Y ESTUDIANTES
routerAdmins.post('/admin/upload',verificarTokenJWT,uploadExcel)

export default routerAdmins