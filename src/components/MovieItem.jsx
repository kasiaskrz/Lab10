import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const MovieItem = (props) => {

    const handleDelete = (e) => {
        e.preventDefault();
        axios.delete('http://localhost:3000/api/movie/' + props.myMovies._id)
            .then(() => {
                props.Reload(); // Refresh the movie list after deletion
            })
            .catch((error) => {
                console.error("Error deleting movie:", error);
            });
    };

    return (
        <div>

            {/* card component from bootstrap */}
            <Card className="text-center">
                <Card.Body>

                    {/* display movie title passed as a prop */}
                    <Card.Title>{props.myMovies.title}</Card.Title>
                    {/* display movie poster */}
                    <img style={{ width: '200px', height: 'auto', borderRadius: '8px' }}
                        src={props.myMovies.poster}></img>
                </Card.Body>
                {/* footer section displaying the year */}
                <Card.Footer className="text-muted">{props.myMovies.year}</Card.Footer>
                <Link className='btn btn-primary' to={"/edit/" + props.myMovies._id}>Edit</Link>
                <Button variant='danger' onClick={handleDelete}>Delete</Button>
            </Card>
        </div>
    );
}

{/* export component */ }
export default MovieItem;