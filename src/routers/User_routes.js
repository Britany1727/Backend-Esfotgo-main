import {Router} from 'express'
import { verAula, listarAulas, listarOficinas, verOficina,listarEventos,verEvento, listarDocentes, verDocente } from '../controllers/admin_controllers.js'
import { actualizarPassword, actualizarPerfil, comprobarTokenPassword, crearNuevoPassword, login, perfil, recuperarPassword, registro } from '../controllers/estudiante_controllers.js'
import { verificarTokenJWT } from '../middlewares/JWT.js'


const router = Router()

//REGISTRO Y AUTENTICACIÓN
router.post('/registro',registro)
router.post('/recuperarpassword',recuperarPassword)
router.get('/recuperarpassword/:token',comprobarTokenPassword)  
router.post('/nuevopassword/:token',crearNuevoPassword)


//AUTENTICACIÓN
router.post('/login',login) 
router.get('/perfil',verificarTokenJWT,perfil)
router.put('/actualizarperfil/:id',verificarTokenJWT,actualizarPerfil)
router.put('/actualizarpassword/:id',verificarTokenJWT,actualizarPassword)

//EVENTOS
router.get('/eventos',listarEventos)
router.get('/verevento/:id',verEvento)

//OFICINAS

router.get('/oficinas',listarOficinas)
router.get('/veroficina/:id',verOficina)



//AULAS
router.get('/aulas',listarAulas)
router.get('/veraula/:id',verAula)


//DOCENTES
router.get('/docentes',listarDocentes)
router.get('/verdocente/:id',verDocente)


export default router