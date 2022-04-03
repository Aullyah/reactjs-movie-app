import { useState, useEffect } from "react"
import axios from "axios"
import { API_KEY } from "../shared/Shared_Variable"
import "../../styles/category.css"

const Category = () => {
    const [genre, setGenres] = useState([])
    const [languages, setLanguages] = useState([])

    useEffect(()=>{
        getGenres()
        getLanguages()
    }, [])

    const getGenres = async() =>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
        setGenres(data.genres.slice(0,6))
        // console.log(data.genres)
    }

    const getLanguages = async() =>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/configuration/languages?api_key=${API_KEY}`)
        let selectedLanguage = ["English","Romanian","Portuguese","Spanish","Indonesian","Italian"]
        // for(const language of data){
        //     console.log()
        // }
        setLanguages(data.slice(data.length-6,data.length))
        // console.log(data.genres)
    }

    return (
        <div className="category">
            <div className="genre">
                {genre?.length > 0 && (
                    <ul>
                        <h3>Genre</h3>
                        {genre.map((genres) => <li key={genres.id}>{genres.name}</li>)}
                        <li>More...</li>
                    </ul>
                )}
            </div>
            <div className="language">
            {languages?.length > 0 && (
                    <ul>
                        <h3>Languages</h3>
                        {languages.map((language) => <li key={language.english_name}>{language.english_name}</li>)}
                        <li>More...</li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Category