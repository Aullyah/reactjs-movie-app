const MovieCard = ({ movie: { title, poster_path, vote_average, id } }) => {
    let img = `https://image.tmdb.org/t/p/w500/${poster_path}`
    return (
        <div className="movie" key={id}>
            <img src={img} alt={title} />
            <h3>{title}</h3>
            <p><i className="fa fa-star"></i>{vote_average}</p>
        </div>
    )
}

export default MovieCard