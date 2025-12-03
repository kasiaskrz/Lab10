// import express and initialize the app
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve static files from Vite build
app.use(express.static(path.join(__dirname, '../dist')))
const app = express();
const port = 3000;

// enable CORS to allow cross-origin requests
import cors from 'cors';
app.use(cors());

// middleware to set custom CORS headers
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// import body-parser to parse incoming request bodies
import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect to MongoDB
import mongoose from 'mongoose';
mongoose.connect('mongodb+srv://admin:admin@katarzynalab.lxrpo7w.mongodb.net/?appName=katarzynalab');

// define the structure of a Movie document in MongoDB
const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  poster: String
});

// create a Mongoose model based on the schema
const movieModel = mongoose.model('Movie', movieSchema);

// define a route for the homepage
app.get('/', (req, res) => {
  res.send('Welcome to Data Respresentation & Querying');
});

// define a route to greet the user by name
app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hello ${name}`);
});

// define a route to greet the user by name, surname
app.get('/hello/:name/:surname', (req, res) => {
  const name = req.params.name;
  const surname = req.params.surname;
  res.send(`Hello ${name} ${surname}`);
});

// define an API endpoint that returns a list of movies
app.get('/api/movies', async (req, res) => {
  // const myMovies = [
  //   // movie data
  //   {
  //     "Title": "Avengers: Infinity War (server)",
  //     "Year": "2018",
  //     "imdbID": "tt4154756",
  //     "Type": "movie",
  //     "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
  //   },
  //   {
  //     "Title": "Captain America: Civil War (server)",
  //     "Year": "2016",
  //     "imdbID": "tt3498820",
  //     "Type": "movie",
  //     "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
  //   },
  //   {
  //     "Title": "World War Z (server)",
  //     "Year": "2013",
  //     "imdbID": "tt0816711",
  //     "Type": "movie",
  //     "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
  //   }
  // ]

  const movies = await movieModel.find({});
  res.json({ myArray: movies });

})

app.get('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// route for creating a new movie
app.post('/api/movies', async (req, res) => {

  const { title, year, poster } = req.body;
  // Create new movie document
  const newMovie = new movieModel({ title, year, poster });
  // Return saved movie
  await newMovie.save();
  console.log("Movie Saved ", newMovie);
  res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
})


app.delete('/api/movie/:id', async (req, res) => {
  // log the movie ID to track which movie is being deleted
  console.log('Deleting movie with id: ', req.params.id);

  // delete the movie by its ID 
  const movie = await movieModel.findByIdAndDelete(req.params.id)
  console.log('Movie deleted: ', movie);

  // send a response with a success message
  res.json({ message: 'Movie deleted successfully', movie: movie });
});


app.get('/api/movie/:id', async (req, res) => {
  let movie = await movieModel.findById({ _id: req.params.id });
  res.send(movie);
});

app.put('/api/movie/:id', async (req, res) => {
  const { title, year, poster } = req.body;
  const updatedMovie = await movieModel.findByIdAndUpdate(req.params.id, { title, year, poster }, { new: true });
  res.send(updatedMovie);
});

// start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

