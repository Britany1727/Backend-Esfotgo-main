import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs"

const aulaSchema = new Schema({
    numero: {
        type: String,   
        required: true,
        trim: true
    },  
    ubicacion: {
        type: String,
        required: true, 
        trim: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['aula', 'laboratorio'],
        trim: true
    },
<<<<<<< HEAD
    edificio: {
        type: Schema.Types.ObjectId,  // Referencia al modelo Edificio
=======
    imagen: {
        type: String,
        trim: true
    },
    piso: {
        type: Number,
        default: 1
    },
    coordenadas: {
        lat: { type: Number },
        lng: { type: Number }
    },
    edificio: {
        type: Schema.Types.ObjectId,
>>>>>>> 080ee708b678ade69079450e2004ace9a6cb0dd7
        ref: 'Edificio',
        required: true
    }
}
,{
    timestamps: true,
    collection: 'aulas'
})

aulaSchema.index({ edificio: 1, numero: 1 });

export default model('Aula', aulaSchema)