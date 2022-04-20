import { Link } from 'react-router-dom'
import styles from './MovieCard.module.css'

const MovieCard = ({ movie: { title, poster_path, vote_average, id } }) => {
    let img = poster_path === null ? `https://via.placeholder.com/200x300?text=Image+Not+Found` : `https://image.tmdb.org/t/p/w500/${poster_path}`
    
    const saveId = (id) =>{
        localStorage.setItem('ID', id)
    }

    return (
        <div className={styles.movie} key={id}>
            <Link to='/detail'>
                <img src={img} alt={title} onClick={() => saveId(id)}/>
            </Link>
            <h3>{title}</h3>
            {/* <i className="fa fa-star" style={styles.iconStyles}></i> */}
            <p>{vote_average}</p>

        </div>
    )
}

export default MovieCard