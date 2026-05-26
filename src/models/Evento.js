import {Schema, model} from 'mongoose'
import bcrypt from "bcryptjs"

const eventoSchema = new Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },  
    informacion:{
        type:String,
        required:true,
        trim:true
    },
    ubicacion:{
        type:String,
        required:false,
        trim:true
<<<<<<< HEAD
    },          
=======
    },
    coordenadas: {
        lat: { type: Number },
        lng: { type: Number }
    },         
>>>>>>> 080ee708b678ade69079450e2004ace9a6cb0dd7
    fecha:{
        type:Date,
        required:true
    },
    hora:{
        type:String,
        required:true
    },
    organizador:{
        type:String,
        required:true,
        trim:true   
    },
    imagen:{
        type:String,
        required:false,
        trim:true
    }
},{
    timestamps:true,
    collection: 'eventos'
})  

export default model('Evento',eventoSchema)