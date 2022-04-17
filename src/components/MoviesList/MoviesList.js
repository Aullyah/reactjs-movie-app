import MovieCard from "./MovieCard/MovieCard";
import styles from '../../styles/App.module.css';
const MoviesList = ({movies})  =>{
    return(
        <div className={styles.movieContainer}>
            {movies && movies.map((movie) => <MovieCard movie={movie} key={movie.id}/>)}
        </div>
    )
}

export default MoviesList