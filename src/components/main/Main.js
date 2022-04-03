import { useState, useEffect } from "react"
import axios from "axios"
import MovieCard from "./MovieCard"
import { API_KEY } from "../shared/Shared_Variable"
import "../../styles/main.css"

const Main = () => {
    // hook
    const [topMovies, setTopMovies] = useState([])
    const [popularMovies, setPopularMovies] = useState([])

    // constructor
    useEffect(() => {
        getTopMovies()
        getPopularMovies()
    }, [])
    const getTopMovies = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
        // console.log(data.results.slice(0,4))
        setTopMovies(data.results.slice(0, 4))
    }
    const getPopularMovies = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
        setPopularMovies(data.results.slice(0, 4))

    }
    return (
        <main>
            <div className="popular-movies">
                <div className="title">
                    <h2>Weekly Popular Movies</h2>
                    <p>See More</p>
                </div>
                {popularMovies?.length > 0 && (
                    <div className="movie-container">
                        {popularMovies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
                    </div>
                )}
            </div>
            <div className="underline"></div>
            <div className="top-rated-movies">
                <div className="title">
                    <h2>Weekly Top Rated Movies</h2>
                    <p>See More</p>
                </div>
                {topMovies?.length > 0 && (
                    <div className="movie-container">
                        {topMovies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
                    </div>
                )}
            </div>

        </main>
    )
}

export default Main