import MovieItem from "./MovieItem";

const Movies = (props) => {
    // Map over the array of movies passed via props.myMovies
    return props.myMovies.map(
        (movie)=>{
            // for each movie object return a MovieItem component with movie data as a prop
            return <MovieItem myMovies={movie} key={movie._id} Reload={props.Reload}></MovieItem>
        }
    );
}
export default Movies;