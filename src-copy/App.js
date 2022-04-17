import axios from 'axios'
import { Component } from 'react'
import { API_KEY } from './Shared'
import styles from './styles/App.module.css'

const iconStyles = {
    fontSize: 14,
    color: '#fad015',
    marginRight: 10
}

const MovieCard = ({ movie: { title, poster_path, vote_average, id } }) => {
    let img = poster_path === null ? `https://via.placeholder.com/200x300?text=Image+Not+Found` : `https://image.tmdb.org/t/p/w500/${poster_path}`
    return (
        <div className={styles.movie} key={id}>
            <img src={img} alt={title} />
            <h3>{title}</h3>
            <p><i className="fa fa-star" style={iconStyles}></i>{vote_average}</p>
        </div>
    )
}

class App extends Component {
    state = {
        genres: [],
        languages: [],
        movies: [],
        isLoading: false,
        isExpandGenre: false,
    }

    componentDidMount() {
        this.fetchGenres()
        this.fetchLangeuage()
        this.fetchMovie()
    }

    fetchGenres = async () => {
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        const { data } = await axios.get(url)
        this.setState({
            genres: data.genres,
        })
    }

    fetchLangeuage = async () => {
        const selectLanguages = ['English', 'Indonesian', 'Spanish']
        const url = `https://api.themoviedb.org/3/configuration/languages?api_key=${API_KEY}`
        const { data } = await axios.get(url)
        let filterLang = []
        // eslint-disable-next-line array-callback-return
        data.map(lang => {
            if (selectLanguages.includes(lang.english_name)) {
                filterLang.push(lang)
            }
        })
        this.setState({
            languages: filterLang
        })
    }

    fetchMovie = async (genre, lang, search) => {
        this.setState({
            isLoading: true,
            movies: []
        })
        setTimeout(async () => {
            let language = 'en-US'
            if (lang != null) {
                language = lang
            }
            const url = search === null || search === undefined ? `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${language}&page=1&with_genres=${genre}` : `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`
            const { data } = await axios.get(url)

            this.setState({
                movies: data.results.slice(0, 8),
                isLoading: false
            })
        }, 1000)
    }

    handleChange = (e) => {
        if (e.charCode === 13) {
            this.fetchMovie(null, null, e.target.value)
        }
    }

    render() {
        const { genres, languages, movies, isLoading, isExpandGenre } = this.state
        return (
            <div className={styles.app}>
                {/* Header (searchbar & menu) */}

                <header>
                    <div className={styles.logo}>Logo</div>
                    <div className={styles.searchbar}>
                        <input type='text' name='search' placeholder='Search any movies or tv shows' onKeyPress={this.handleChange} />
                    </div>
                    <nav>
                        <ul>
                            <li className={styles.active}>Movies</li>
                            <li>TV Shows</li>
                            {/* <li>Watchlist</li> */}
                            <li className={styles.profileImg}><img src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1834&q=80" alt='profile img' /></li>
                        </ul>
                    </nav>
                </header>
                <main>
                    {/* Sidebar (genre) */}
                    <div className={styles.category}>
                        <h2>Genre</h2>
                        <ul>
                            {genres.length > 0 && !isExpandGenre ? genres.slice(0, 6).map((genre) => <li key={genre.id} onClick={() => this.fetchMovie(genre.id, null, null)}>{genre.name}</li>) : genres.map((genre) => <li key={genre.id} onClick={() => this.fetchMovie(genre.id, null, null)}>{genre.name}</li>)}
                            {!isExpandGenre && <li onClick={() => this.setState({ isExpandGenre: true })}>More...</li>}
                            {isExpandGenre && <li onClick={() => this.setState({ isExpandGenre: false })}>Hide...</li>}
                        </ul>

                        <h2>Language</h2>
                        <ul>
                            {languages.length > 0 && languages.reverse().map((lang) => <li key={lang.english_name} onClick={() => this.fetchMovie(null, lang.iso_639_1, null)}>{lang.name}</li>)}
                        </ul>
                    </div>
                    {/* main content */}

                    <div className={styles.mainContent}>
                        <div className={styles.movieHeader}>
                            <h2>Weekly Top Rated Movies</h2>
                            <p>See More</p>
                        </div>
                        <div className={styles.movieContainer}>
                            {movies.length > 0 && movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
                            {isLoading && <div className={styles.wrapLoader}><div className={styles.loader}></div></div>}
                        </div>
                    </div>

                    {/* Sidebar (Trailer) */}
                </main>
            </div>
        )
    }
}

export default App