import { Schema, model } from "mongoose";

const nodoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['entrada', 'hall', 'pasillo', 'escalera', 'ascensor', 'aula', 'laboratorio', 'oficina', 'bano', 'cafeteria', 'salida_emergencia', 'punto_interes'],
        trim: true
    },
    coordenadas: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    piso: {
        type: Number,
        default: 1
    },
    edificioId: {
        type: Schema.Types.ObjectId,
        ref: 'Edificio',
        required: true
    },
    referenciaId: {
        type: Schema.Types.ObjectId,
        refPath: 'referenciaModelo'
    },
    referenciaModelo: {
        type: String,
        enum: ['Aula', 'Oficina', 'Evento', null]
    },
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    collection: 'nodos'
});

nodoSchema.index({ edificioId: 1, piso: 1 });
nodoSchema.index({ 'coordenadas': '2dsphere' });

export default model('Nodo', nodoSchema);
