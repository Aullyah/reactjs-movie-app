import { useState, useEffect } from "react"
import axios from "axios"
import { API_KEY } from "../shared/Shared_Variable"
import "../../styles/trailer.css"

const Trailers = () => {
    const [trailers, setTrailers] = useState([])

    useEffect(() => {

    }, [])

    const getTrailers = async () => {
        const {data} = await axios.get(``)
        setTrailers()
    }
    return(
        <aside>
            <div className="trailers">
                <h2>New Trailers</h2>

            </div>
        </aside>
    )
}


export default Trailers