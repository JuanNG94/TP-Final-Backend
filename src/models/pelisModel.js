import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const pelisSchema = new mongoose.Schema({
    adult: {
        type: Boolean,
    },
    backdrop_path: {
        type: String,
    },
    genre_ids: {
        type: [Number],
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    original_language: {
        type: String,
    },
    original_title: {
        type: String,
    },
    overview: {
        type: String,
    },
    popularity: {
        type: Number,
    },
    poster_path: {
        type: String,
    },
    release_date: {
        type: String, // Se usa String para mantener el formato 'YYYY-MM-DD'
    },
    title: {
        type: String,
        required: true
    },
    video: {
        type: Boolean,
    },
    vote_average: {
        type: Number,
    },
    vote_count: {
        type: Number,
    }
}, {
    timestamps: true
});

pelisSchema.plugin(mongoosePaginate);

export default mongoose.model("movies", pelisSchema);