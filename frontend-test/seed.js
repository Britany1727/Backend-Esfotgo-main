import mongoose from "mongoose";
import Edificio from "../src/models/Edificio.js";
import Aula from "../src/models/Aulas.js";
import Oficina from "../src/models/Oficinas.js";
import Nodo from "../src/models/Nodo.js";
import Conexion from "../src/models/Conexion.js";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI_PRODUCTION || "mongodb://localhost:27017/Esfot";

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Conectado a MongoDB");

        // Limpiar datos previos
        await Edificio.deleteMany({});
        await Aula.deleteMany({});
        await Oficina.deleteMany({});
        await Nodo.deleteMany({});
        await Conexion.deleteMany({});
        console.log("Datos previos eliminados");

        // === EDIFICIO ESFOT (polígono real aproximado) ===
        const esfot = await Edificio.create({
            nombre: "ESFOT - Edificio de Tecnologías",
            codigo: "21",
            descripcion: "Edificio principal de la Escuela Superior de Formación de Tecnólogos",
            centro: {
                type: "Point",
                coordinates: [-78.4920, -0.2115]
            },
            poligono: {
                type: "Polygon",
                coordinates: [[
                    [-78.4928, -0.2108],
                    [-78.4912, -0.2108],
                    [-78.4912, -0.2122],
                    [-78.4928, -0.2122],
                    [-78.4928, -0.2108]
                ]]
            },
            pisos: 4
        });
        console.log("Edificio ESFOT creado:", esfot.nombre);

        // === AULAS Y LABORATORIOS ===
        const aulasData = [
            { numero: "101", ubicacion: "Planta Baja - Ala Norte", tipo: "aula", piso: 1, coordenadas: { lat: -0.2115, lng: -78.4920 }, edificio: esfot._id },
            { numero: "102", ubicacion: "Planta Baja - Ala Sur", tipo: "aula", piso: 1, coordenadas: { lat: -0.2118, lng: -78.4920 }, edificio: esfot._id },
            { numero: "103", ubicacion: "Planta Baja - Ala Este", tipo: "laboratorio", piso: 1, coordenadas: { lat: -0.2115, lng: -78.4915 }, edificio: esfot._id },
            { numero: "201", ubicacion: "Segundo Piso - Ala Norte", tipo: "laboratorio", piso: 2, coordenadas: { lat: -0.2113, lng: -78.4920 }, edificio: esfot._id },
            { numero: "202", ubicacion: "Segundo Piso - Ala Sur", tipo: "aula", piso: 2, coordenadas: { lat: -0.2117, lng: -78.4922 }, edificio: esfot._id },
            { numero: "203", ubicacion: "Segundo Piso - Ala Este", tipo: "laboratorio", piso: 2, coordenadas: { lat: -0.2114, lng: -78.4914 }, edificio: esfot._id },
            { numero: "301", ubicacion: "Tercer Piso - Ala Norte", tipo: "aula", piso: 3, coordenadas: { lat: -0.2113, lng: -78.4918 }, edificio: esfot._id },
            { numero: "302", ubicacion: "Tercer Piso - Ala Sur", tipo: "laboratorio", piso: 3, coordenadas: { lat: -0.2117, lng: -78.4918 }, edificio: esfot._id },
        ];
        const aulas = await Aula.insertMany(aulasData);
        console.log(`${aulas.length} aulas/laboratorios creados`);

        // === OFICINAS ===
        const oficinasData = [
            { numero: "001", ubicacion: "Planta Baja - Entrada", encargado: "Secretaría ESFOT", telefono: "022976300", piso: 1, coordenadas: { lat: -0.2113, lng: -78.4925 }, edificio: esfot._id },
            { numero: "002", ubicacion: "Segundo Piso", encargado: "Coordinación Académica", telefono: "022976301", piso: 2, coordenadas: { lat: -0.2116, lng: -78.4924 }, edificio: esfot._id },
            { numero: "003", ubicacion: "Tercer Piso", encargado: "Dirección ESFOT", telefono: "022976302", piso: 3, coordenadas: { lat: -0.2115, lng: -78.4923 }, edificio: esfot._id },
        ];
        const oficinas = await Oficina.insertMany(oficinasData);
        console.log(`${oficinas.length} oficinas creadas`);

        // === NODOS DE NAVEGACIÓN ===
        const nodosData = [
            // Entrada principal
            { nombre: "Entrada Principal", tipo: "entrada", coordenadas: { lat: -0.2109, lng: -78.4928 }, piso: 1, edificioId: esfot._id },
            // Hall planta baja
            { nombre: "Hall Central PB", tipo: "hall", coordenadas: { lat: -0.2113, lng: -78.4923 }, piso: 1, edificioId: esfot._id },
            // Pasillos PB
            { nombre: "Pasillo Norte PB", tipo: "pasillo", coordenadas: { lat: -0.2113, lng: -78.4919 }, piso: 1, edificioId: esfot._id },
            { nombre: "Pasillo Sur PB", tipo: "pasillo", coordenadas: { lat: -0.2118, lng: -78.4919 }, piso: 1, edificioId: esfot._id },
            // Escaleras
            { nombre: "Escalera Principal PB", tipo: "escalera", coordenadas: { lat: -0.2114, lng: -78.4922 }, piso: 1, edificioId: esfot._id },
            { nombre: "Escalera Principal P2", tipo: "escalera", coordenadas: { lat: -0.2114, lng: -78.4922 }, piso: 2, edificioId: esfot._id },
            { nombre: "Escalera Principal P3", tipo: "escalera", coordenadas: { lat: -0.2114, lng: -78.4922 }, piso: 3, edificioId: esfot._id },
            // Pasillos P2
            { nombre: "Pasillo Norte P2", tipo: "pasillo", coordenadas: { lat: -0.2112, lng: -78.4919 }, piso: 2, edificioId: esfot._id },
            { nombre: "Pasillo Sur P2", tipo: "pasillo", coordenadas: { lat: -0.2118, lng: -78.4920 }, piso: 2, edificioId: esfot._id },
            // Referencias a aulas como nodos
            { nombre: "Aula 101", tipo: "aula", coordenadas: { lat: -0.2115, lng: -78.4920 }, piso: 1, edificioId: esfot._id, referenciaId: aulas[0]._id, referenciaModelo: "Aula" },
            { nombre: "Aula 102", tipo: "aula", coordenadas: { lat: -0.2118, lng: -78.4920 }, piso: 1, edificioId: esfot._id, referenciaId: aulas[1]._id, referenciaModelo: "Aula" },
            { nombre: "Lab 103", tipo: "laboratorio", coordenadas: { lat: -0.2115, lng: -78.4915 }, piso: 1, edificioId: esfot._id, referenciaId: aulas[2]._id, referenciaModelo: "Aula" },
            { nombre: "Lab 201", tipo: "laboratorio", coordenadas: { lat: -0.2113, lng: -78.4920 }, piso: 2, edificioId: esfot._id, referenciaId: aulas[3]._id, referenciaModelo: "Aula" },
            { nombre: "Aula 202", tipo: "aula", coordenadas: { lat: -0.2117, lng: -78.4922 }, piso: 2, edificioId: esfot._id, referenciaId: aulas[4]._id, referenciaModelo: "Aula" },
            { nombre: "Oficina 001", tipo: "oficina", coordenadas: { lat: -0.2113, lng: -78.4925 }, piso: 1, edificioId: esfot._id, referenciaId: oficinas[0]._id, referenciaModelo: "Oficina" },
            { nombre: "Oficina 002", tipo: "oficina", coordenadas: { lat: -0.2116, lng: -78.4924 }, piso: 2, edificioId: esfot._id, referenciaId: oficinas[1]._id, referenciaModelo: "Oficina" },
            // Pasillo P3
            { nombre: "Pasillo Norte P3", tipo: "pasillo", coordenadas: { lat: -0.2112, lng: -78.4917 }, piso: 3, edificioId: esfot._id },
        ];
        const nodos = await Nodo.insertMany(nodosData);
        console.log(`${nodos.length} nodos creados`);

        // Crear mapa de IDs de nodos por nombre
        const n = {};
        for (const nodo of nodos) {
            n[nodo.nombre] = nodo._id.toString();
        }

        // === CONEXIONES DEL GRAFO ===
        const conexionesData = [
            // Entrada -> Hall
            { nodoOrigen: n["Entrada Principal"], nodoDestino: n["Hall Central PB"], distancia: 45 },
            // Hall -> Pasillos PB
            { nodoOrigen: n["Hall Central PB"], nodoDestino: n["Pasillo Norte PB"], distancia: 15 },
            { nodoOrigen: n["Hall Central PB"], nodoDestino: n["Pasillo Sur PB"], distancia: 20 },
            { nodoOrigen: n["Hall Central PB"], nodoDestino: n["Escalera Principal PB"], distancia: 8 },
            // Pasillos PB -> Aulas/Labs
            { nodoOrigen: n["Pasillo Norte PB"], nodoDestino: n["Aula 101"], distancia: 10 },
            { nodoOrigen: n["Pasillo Norte PB"], nodoDestino: n["Lab 103"], distancia: 25 },
            { nodoOrigen: n["Pasillo Sur PB"], nodoDestino: n["Aula 102"], distancia: 8 },
            // PB -> Oficinas
            { nodoOrigen: n["Hall Central PB"], nodoDestino: n["Oficina 001"], distancia: 12 },
            // Escalera PB -> P2
            { nodoOrigen: n["Escalera Principal PB"], nodoDestino: n["Escalera Principal P2"], distancia: 5, tipo: "escalera" },
            // Pasillos P2
            { nodoOrigen: n["Escalera Principal P2"], nodoDestino: n["Pasillo Norte P2"], distancia: 10 },
            { nodoOrigen: n["Escalera Principal P2"], nodoDestino: n["Pasillo Sur P2"], distancia: 15 },
            // Pasillos P2 -> Aulas/Labs
            { nodoOrigen: n["Pasillo Norte P2"], nodoDestino: n["Lab 201"], distancia: 8 },
            { nodoOrigen: n["Pasillo Sur P2"], nodoDestino: n["Aula 202"], distancia: 10 },
            // P2 -> Oficina
            { nodoOrigen: n["Pasillo Sur P2"], nodoDestino: n["Oficina 002"], distancia: 12 },
            // Escalera P2 -> P3
            { nodoOrigen: n["Escalera Principal P2"], nodoDestino: n["Escalera Principal P3"], distancia: 5, tipo: "escalera" },
            // Pasillo P3
            { nodoOrigen: n["Escalera Principal P3"], nodoDestino: n["Pasillo Norte P3"], distancia: 12 },
        ];
        const conexiones = await Conexion.insertMany(conexionesData);
        console.log(`${conexiones.length} conexiones creadas`);

        console.log("\n✅ SEED COMPLETADO EXITOSAMENTE");
        console.log("📊 Resumen:");
        console.log(`  - 1 Edificio (ESFOT)`);
        console.log(`  - ${aulas.length} Aulas/Laboratorios`);
        console.log(`  - ${oficinas.length} Oficinas`);
        console.log(`  - ${nodos.length} Nodos de navegación`);
        console.log(`  - ${conexiones.length} Conexiones`);
        console.log("\n🌐 Inicia el backend con: npm run dev");
        console.log("📂 Abre frontend-test/index.html en tu navegador");

    } catch (error) {
        console.error("Error en seed:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Desconectado de MongoDB");
    }
}

seed();
