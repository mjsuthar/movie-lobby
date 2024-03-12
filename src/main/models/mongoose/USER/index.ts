import { Document, Schema } from 'mongoose';

interface IMovies extends Document {
  email: string;
  token: string;
  isAdmin: boolean;
}

const userSchema = new Schema<IMovies>({
  email: { type: String, required: true },
  token: { type: String, required: false },
  isAdmin: { type: Boolean, default: false }
});

const MovieModel = APP.MongoDB.model<IMovies>('User', userSchema);

export default MovieModel;