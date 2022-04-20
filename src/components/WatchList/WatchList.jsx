import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './WatchList.module.css'


const WatchCard = ({ movie: { id,backdrop_path, title, genres, vote_average } }) => {
    let genre = ''
    genres.map((gen, id) => id === genres.length ? genre = genre + gen.name : genre = genre + gen.name + ',')

    const remove = async (id) => {
        await axios.delete(`https://625c6a7295cd5855d612ab68.mockapi.io/fakeData/${id}`)
    }

    return (
        <div className={styles.watchListCard}>
            <img src={backdrop_path === null ? `https://via.placeholder.com/200x300?text=Image+Not+Found` : `https://image.tmdb.org/t/p/w500/${backdrop_path}`} alt={title} />
            <div className={styles.cardTitle}>
                <h4>{title}</h4>
                <p>{genre}</p>
            </div>
            <div className={styles.cardVoting}>
                <button onClick={ () => remove(id)}>remove</button>
            </div>
        </div>
    )
}

const WatchList = () => {

    // const [movies, setMovies] = useState([])
    const [dataDB, setDataDB] = useState([])

    useEffect(() => {
        function fetchDb () {
            axios
                .get(`https://625c6a7295cd5855d612ab68.mockapi.io/fakeData`)
                // .then((response) => response.data.map((data) => data.ids > 0 ? fetchMovie(data.ids) : console.log(movies)))
                .then((response) => setDataDB(response.data))
                
        }

        fetchDb()
        


    }, [])

    // const fetchData = () => {
    //     dataDB.map((db) => db.ids > 0 ? fetchMovie(db.ids) : console.log(movies))
    // }

    // const fetchMovie = async (ids) => {
    //     const response = await axios.get(`https://api.themoviedb.org/3/movie/${ids}?api_key=81a95d73fa573be5cee1a81bf12741d2&language=en-US`)
    //     setMovies((movies) => [...movies, response.data])
    // }

    return (
        <div className={styles.watchList}>
            <h2>Watch List</h2>
            <p>list of watch list movie</p>
            <div className={styles.watchListView}>
                {dataDB.length > 0 ? dataDB.map((movie) => <WatchCard movie={movie} key={movie.id} />) : <h2>No Data</h2>}
            </div>
        </div>
    )
}

export default WatchList