import { StrictMode } from "react";
import { createRoot } from "react-dom/client"
import App from "./App"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import DetailMovie from "./components/DetailMovie/DetailMovie";
import WatchList from "./components/WatchList/WatchList";

const rootElement = document.getElementById("root")
const root = createRoot(rootElement)
root.render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />}/>
                <Route path="/detail" element={<DetailMovie />}/>
                <Route path="/watchlist" element={<WatchList />}/>
            </Routes>
        </Router>
        
    </StrictMode>
)