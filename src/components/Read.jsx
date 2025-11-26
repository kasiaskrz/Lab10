import { useEffect, useState } from "react";
import Movies from "./Movies"; // import the Movies component
import axios from 'axios';

const Read = () => {
    const [myMovies, setMovie] = useState([]);

    const Reload = () => {
        // fetches the updated list of movies from the API
        axios.get('http://localhost:3000/api/movies')
            .then((response) => {
                console.log(response.data.myArray);
                setMovie(response.data.myArray);
            })
            .catch((error) => { console.log(error) });
    };

    useEffect(
        () => {
           
                Reload();
           
            }, []
    );

    return (
        <div>
            <h1>Hello from Read component</h1>
            {/* pass the movie data as a prop to the Movies component */}
            <Movies myMovies={myMovies} Reload={Reload}></Movies>
        </div>
    );
}

export default Read;
