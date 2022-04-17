import axios from "axios";
import { useEffect, useState } from "react";
import { API_KEY } from "./shared/shared";
import styles from './styles/App.module.css';
import MoviesList from "./components/MoviesList/MoviesList";

const App = () => {
    const [genres, setGenres] = useState([])
    const [language, setLanguage] = useState([])
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isExpandGenre, setIsExpandGenre] = useState(false)
    const [search, setSearch] = useState('')
    const [title, setTitle] = useState('Weekly Top Rated Movies')
    const [selectGenres, setselectGenres] = useState('')
    const [selectLanguage, setselectLanguage] = useState('')
    const [page, setPage] = useState(1)

    useEffect(() => {
        const fetchMovie = async () => {
            console.log(page)
            setIsLoading(true)
            setTimeout(async () => {
                let lang = 'en-US'
                if (selectLanguage !== '') {
                    lang = selectLanguage
                }
                if (search !== '') {
                    setTitle('Search : ' + search)
                }
                const url = search === '' ? `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${lang}&page=${page}&with_genres=${selectGenres}` : `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`
                const { data } = await axios.get(url)
                if (page === 1) {
                    setMovies(data.results)
                } else {
                    setMovies((movies) => [...movies, ...data.results])
                }


                setIsLoading(false)
            }, 1000)
        }

        fetchGenres()
        fetchLangeuage()
        fetchMovie()
    }, [selectGenres, selectLanguage, search, page])

    const fetchGenres = async () => {
        try {
            const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
            const response = await axios.get(url)
            setGenres([...response.data.genres])
        } catch (error) {
            console.log(error)
        } finally {

        }
    }

    const fetchLangeuage = async () => {
        try {
            const selectLanguages = ['English', 'Indonesian', 'Spanish']
            const url = `https://api.themoviedb.org/3/configuration/languages?api_key=${API_KEY}`
            const response = await axios.get(url)
            let filterLang = []
            // response.data.map((lang) => {
            //     if (selectLanguages.includes(lang.english_name)) {
            //         filterLang.push(lang)
            //     }
            // })
            response.data.map(function (lang) {
                if (selectLanguages.includes(lang.english_name)) {
                    filterLang.push(lang)
                }
                return filterLang
            })
            setLanguage(filterLang)
        } catch (error) {

        } finally {

        }
    }

    const handleChange = (e) => {
        if (e.charCode === 13) {
            setSearch(e.target.value)
        }
    }

    const loadMore = () => {
        setPage((page) => page + 1)
    }


    return (
        <div className={styles.app}>
            <header>
                <div className={styles.logo}>Logo</div>
                <div className={styles.searchbar}>
                    <input type='text' name='search' placeholder='Search any movies or tv shows' onKeyPress={handleChange} />
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
                <div className={styles.category}>
                    <h2>Genre</h2>
                    <ul>
                        {genres && !isExpandGenre ? genres.slice(0, 6).map((genre) => <li key={genre.id} onClick={() => setselectGenres(genre.id)}>{genre.name}</li>) : genres.map((genre) => <li key={genre.id} onClick={() => setselectGenres(genre.id)}>{genre.name}</li>)}
                        {!isExpandGenre ?
                            <li onClick={() => setIsExpandGenre(true)}>More...</li> :
                            <li onClick={() => setIsExpandGenre(false)}>Hide...</li>}
                    </ul>

                    <h2>Language</h2>
                    <ul>
                        {language && language.reverse().map((lang) => <li key={lang.english_name} onClick={() => setselectLanguage(lang.iso_639_1)}>{lang.name}</li>)}
                    </ul>
                </div>
                <div className={styles.mainContent}>
                    <div className={styles.movieHeader}>
                        {/* <h2>Weekly Top Rated Movies</h2> */}
                        <h2>{title}</h2>
                        <p>See More</p>
                    </div>
                    <div>
                        <MoviesList movies={movies} />
                        {isLoading && <div className={styles.wrapLoader}><div className={styles.loader}></div></div>}
                    </div>
                    <div className={styles.loadMore}>
                        {!isLoading && <button onClick={loadMore}>Load More</button>}
                    </div>
                </div>

            </main>
        </div>
    )
}

export default App