// import { Component } from "react";
import styles from '../../styles/Header.module.css'
// import ProfilImage from "../../assets/profil.jpg"

const Header = () => {

    return(
        <nav>
            <div className={styles.search}>
                <input type="text" placeholder="Search any movies or tv shows"/>
            </div>
            <ul className={styles.navHeader}>
                    <li className={styles.active}>Movies</li>
                    <li>TV Shows</li>
                    <li>Watchlist</li>
                    <li className={styles.profilImg}>
                        {/* <img src={ProfilImage} alt="Profil"/> */}
                    </li>
                </ul>
        </nav>
    )
}

export default Header