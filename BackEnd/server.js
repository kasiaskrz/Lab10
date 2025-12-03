import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Setup path helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express BEFORE using app
const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from React/Vite build
app.use(express.static(path.join(__dirname, '../dist')));

// MongoDB connection
mongoose.connect('mongodb+srv://admin:admin@katarzynalab.lxrpo7w.mongodb.net/?appName=katarzynalab');

// Schema + Model
const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  poster: String
});
const movieModel = mongoose.model('Movie', movieSchema);

// API routes
app.get('/api/movies', async (req, res) => {
  const movies = await movieModel.find({});
  res.json({ myArray: movies });
});

app.post('/api/movies', async (req, res) => {
  const { title, year, poster } = req.body;
  const newMovie = new movieModel({ title, year, poster });
  await newMovie.save();
  res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
});

app.delete('/api/movie/:id', async (req, res) => {
  const movie = await movieModel.findByIdAndDelete(req.params.id);
  res.json({ message: 'Movie deleted successfully', movie });
});

app.get('/api/movie/:id', async (req, res) => {
  const movie = await movieModel.findById(req.params.id);
  res.send(movie);
});

app.put('/api/movie/:id', async (req, res) => {
  const { title, year, poster } = req.body;
  const updatedMovie = await movieModel.findByIdAndUpdate(
    req.params.id,
    { title, year, poster },
    { new: true }
  );
  res.send(updatedMovie);
});

// Catch-all route to return the React index file
app.get('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});


// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
