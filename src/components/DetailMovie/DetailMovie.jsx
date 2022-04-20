import axios from "axios"
import { useEffect, useState } from "react"
import styles from './DetailMovie.module.css'

const CompanyCard = ({ logo_path, name }) => {
    let img = logo_path === null ? `https://via.placeholder.com/200x300?text=Image+Not+Found` : `https://image.tmdb.org/t/p/w500/${logo_path}`
    return (
        <div>
            {logo_path && <img src={img} alt={name} />}
        </div>
    )
}

const DetailMovie = () => {
    const [movie, setMovie] = useState({})

    useEffect(() => {
        const id = localStorage.getItem('ID')
        const fetchMovie = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=81a95d73fa573be5cee1a81bf12741d2&language=en-US`)
            setMovie(response.data)
        }

        fetchMovie()
    }, [])
    const addWishList = async() => {
        const ids = movie.id
        console.log(ids)
        await axios.post(`https://625c6a7295cd5855d612ab68.mockapi.io/fakeData`,{
            ids : ids,
            title: movie.title,
            backdrop_path: movie.backdrop_path,
            vote_average: movie.vote_average,
            genres: movie.genres
        })
    }
    return (
        <div className={styles.detailCard}>
            <div className={styles.img}>
                <img src={movie.backdrop_path === null ? `https://via.placeholder.com/200x300?text=Image+Not+Found` : `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt={movie.original_title} />

            </div>
            <div className={styles.detailHeader}>
                <h2>{movie.title}</h2>
                <button onClick={addWishList}>Add to whishlist</button>
            </div>
            <div className={styles.detailVote}>
                <p><i className="fa fa-star"></i> </p>
                <p>{movie.vote_average}</p>

            </div>
            <div className={styles.detailMain}>
                <h2>Description</h2>
                <p>{movie.overview}</p>
                <hr />

                <h2>Genres</h2>
                <ul className={styles.detailGenre}>
                    {movie.genres && movie.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}
                </ul>
                <hr />

                <h2>Production Company</h2>
                <div className={styles.detailCompany}>
                    {movie.production_companies && movie.production_companies.map((company) => <CompanyCard {...company} key={company.id} />)}
                </div>
                <hr />

                <h2>Available Language</h2>
                <div className={styles.detailLanguage}>
                    {movie.spoken_languages && movie.spoken_languages.map((lang) => <p key={lang.iso_639_1}>{lang.english_name}</p>)}
                </div>

            </div>
        </div>
    )
}

export default DetailMovie