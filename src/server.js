// Requerir módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routerAdmins from './routers/Admin_routes.js';
import routerDocentes from './routers/Docente_routes.js';
import cloudinary from 'cloudinary'
import fileUpload from "express-fileupload"
import connection from './database.js' 
import session from 'express-session' 
import router from './routers/Estudiante_routes.js';

// Inicializaciones
const app = express()
dotenv.config()
connection() // Conectar a la BD

// Configuraciones Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// --- MIDDLEWARES (ORDEN CRÍTICO) ---
app.use(express.json()) // Permite leer JSON en el body
app.use(express.urlencoded({ extended: true }))
// 1. CORS debe permitir credenciales para las cookies de sesión
app.use(cors({
    origin: "http://localhost:5173", // URL de tu Vite/React
    credentials: true
}));

app.use(express.json())


app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}))

// Variables globales
app.set('port', process.env.PORT || 3000)

// --- RUTAS ---

app.get('/', (req, res) => res.send("Server on"))


app.use('/api', router)
app.use('/api', routerAdmins)
app.use('/api', routerDocentes)

// Manejo de 404
app.use((req, res) => res.status(404).send("Endpoint no encontrado - 404"))

export default app;