// import { Component } from "react";
import "../../styles/header.css"
import ProfilImage from "../../assets/profil.jpg"

const Header = () => {

    return(
        <nav>
            <div className="search">
                <input type="text" placeholder="Search any movies or tv shows"/>
            </div>
            <ul className="nav-header">
                    <li className="active">Movies</li>
                    <li>TV Shows</li>
                    <li>Watchlist</li>
                    <li className="profil-img">
                        {/* <img src={ProfilImage} alt="Profil"/> */}
                    </li>
                </ul>
        </nav>
    )
}

export default Header