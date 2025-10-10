import mongoose from 'mongoose'

// Creamos el esquema de usuario
const favoriteSchema = new mongoose.Schema({
    // Nombres de los atributos
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies",
        required: true
    },

}, {

    timestamps: true} )

export default mongoose.model("favorites", favoriteSchema, "favorites")