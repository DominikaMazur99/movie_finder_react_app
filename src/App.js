import MainNavbar from "./components/navbar/MainNavbar";
import "./App.scss";
import PopularMovies from "./components/popularMovies/PopularMovies";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import KidsMovies from "./components/kidsMovies/KidsMovies";
import ScienceFictionMovies from "./components/scienceFictionMovies/ScienceFictionMovies";
import AddToFavouriteProvider from "./context/AddToFavouritesContext";

function App() {
    return (
        <>
            <BrowserRouter>
                <AddToFavouriteProvider>
                    <MainNavbar />
                    <Routes>
                        <Route path="/" element={<PopularMovies />} />
                        <Route path="/kids" element={<KidsMovies />} />
                        <Route
                            path="/science_fiction"
                            element={<ScienceFictionMovies />}
                        />
                    </Routes>
                </AddToFavouriteProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
