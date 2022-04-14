import { useState, useEffect } from "react"
import axios from "axios"
import MovieCard from "./MovieCard"
import { API_KEY } from "../shared/Shared_Variable"
import styles from "../../styles/Main.module.css"

const Main = ({ searchGenre }) => {
    // hook
    const [topMovies, setTopMovies] = useState([])
    const [popularMovies, setPopularMovies] = useState([])

    // constructor
    useEffect(() => {
        getTopMovies()
        getPopularMovies()
    }, [searchGenre])
    const getTopMovies = async () => {
        const { data } = searchGenre > 0 ? await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1&with_genres=${searchGenre}`) : await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
        setTopMovies(data.results.slice(0, 4))
    }
    const getPopularMovies = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
        setPopularMovies(data.results.slice(0, 4))

    }
    return (
        <main>
            <div className={styles.popularMovies}>
                <div className={styles.title}>
                    <h2>Weekly Popular Movies</h2>
                    <p>See More</p>
                </div>
                {popularMovies?.length > 0 && (
                    <div className={styles.movieContainer}>
                        {popularMovies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
                    </div>
                )}
                {searchGenre > 0 && <p>{searchGenre}</p>}
            </div>
            <div className={styles.underline}></div>
            <div className={styles.topRatedMovies}>
                <div className={styles.title}>
                    <h2>Weekly Top Rated Movies</h2>
                    <p>See More</p>
                </div>
                {topMovies?.length > 0 && (
                    <div className={styles.movieContainer}>
                        {topMovies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
                    </div>
                )}
            </div>

        </main>
    )
}

export default Main