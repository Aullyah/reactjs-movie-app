import styles from './MovieCard.module.css'

const MovieCard = ({movie : { title, poster_path, vote_average, id }}) => {
    let img = poster_path === null ? `https://via.placeholder.com/200x300?text=Image+Not+Found` : `https://image.tmdb.org/t/p/w500/${poster_path}`
    return (
        <div className={styles.movie} key={id}>
            <img src={img} alt={title} />
            <h3>{title}</h3>
            {/* <i className="fa fa-star" style={styles.iconStyles}></i> */}
            <p>{vote_average}</p>
        </div>
    )
}

export default MovieCard