import { Document, Schema } from 'mongoose';

interface IMovies extends Document {
  title: string;
  genre: string;
  rating: number;
  streaming_link: string;
}

const movieSchema = new Schema<IMovies>({
  title: { type: String, required: true },
  rating: { type: Number, required: true },
  genre: { type: String, required: true },
  streaming_link: { type: String, required: true },
});

const MovieModel = APP.MongoDB.model<IMovies>('Movie', movieSchema);

export default MovieModel;