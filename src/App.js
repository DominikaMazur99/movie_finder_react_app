import MainNavbar from "./components/navbar/MainNavbar";
import "./App.scss";
import MainSearcher from "./components/searcher/MainSearcher";
import PopularMovies from "./components/popularMovies/PopularMovies";

function App() {
    return (
        <>
            <MainNavbar />
            <MainSearcher />
            <PopularMovies />
        </>
    );
}

export default App;
