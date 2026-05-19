import { Router } from 'express';
import { verificarTokenJWT } from '../middlewares/JWT.js';
import {
    obtenerAreaEsfot,
    obtenerPuntosMapa,
    obtenerRuta,
    obtenerNodosNavegacion,
    obtenerGrafo,
    buscarDestino,
    crearNodo,
    crearConexion,
    crearEdificio,
    listarEdificios,
    verEdificio,
    actualizarEdificio,
    eliminarEdificio
} from '../controllers/mapa_controllers.js';

const routerMapa = Router();

// MAPA - Área ESFOT (público)
routerMapa.get('/mapa/area', obtenerAreaEsfot);
routerMapa.get('/mapa/puntos', obtenerPuntosMapa);
routerMapa.get('/mapa/buscar', buscarDestino);

// RUTAS (público)
routerMapa.get('/mapa/ruta', obtenerRuta);

// NAVEGACIÓN - Nodos y Grafo (público)
routerMapa.get('/mapa/nodos', obtenerNodosNavegacion);
routerMapa.get('/mapa/grafo', obtenerGrafo);

// EDIFICIOS CRUD (admin)
routerMapa.post('/admin/mapa/edificio', verificarTokenJWT, crearEdificio);
routerMapa.get('/admin/mapa/edificios', verificarTokenJWT, listarEdificios);
routerMapa.get('/admin/mapa/edificio/:id', verificarTokenJWT, verEdificio);
routerMapa.put('/admin/mapa/edificio/:id', verificarTokenJWT, actualizarEdificio);
routerMapa.delete('/admin/mapa/edificio/:id', verificarTokenJWT, eliminarEdificio);

// NODOS Y CONEXIONES (admin)
routerMapa.post('/admin/mapa/nodo', verificarTokenJWT, crearNodo);
routerMapa.post('/admin/mapa/conexion', verificarTokenJWT, crearConexion);

export default routerMapa;
