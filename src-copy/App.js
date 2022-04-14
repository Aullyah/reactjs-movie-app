import { Component} from "react"
import Main from "./components/main/Main"
// import Trailers from "./components/trailers/Trailers"
import Category from "./components/category/Category"
import Header from "./components/header/Header"
import "./styles/app.css"

class App extends Component {
    render() {
        return (
            <div className="app">
                <Header/>
                <Category />
                <Main searchGenre={0}/>
                {/* <Trailers /> */}
            </div>
        )
    }
}

export default App