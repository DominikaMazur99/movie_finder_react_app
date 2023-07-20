import "./App.scss";
import PopularMovies from "./components/popularMovies/PopularMovies";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm.jsx";
import RegisterForm from "./components/auth/RegisterForm.jsx";
import KidsMovies from "./components/kidsMovies/KidsMovies";
import ScienceFictionMovies from "./components/scienceFictionMovies/ScienceFictionMovies";
import AddToFavouriteProvider from "./context/AddToFavouritesContext";
import { getDataFromLocalStorage } from "./helpers/localStorageFunctions";
import { useEffect, useState } from "react";

function App() {
    const [isAuth, setIsAuth] = useState("");

    useEffect(() => {
        setIsAuth(getDataFromLocalStorage("login"));
    }, []);

    console.log(isAuth);

    return (
        <>
            <BrowserRouter>
                <AddToFavouriteProvider>
                    <Routes>
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/login" element={<LoginForm />} />
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
