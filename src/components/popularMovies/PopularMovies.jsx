import MovieCards from "../movieCards/MovieCards";
import MainNavbar from "../navbar/MainNavbar";

function PopularMovies() {
    return (
        <>
            <MainNavbar />
            <MovieCards category="popular" />
        </>
    );
}

export default PopularMovies;
