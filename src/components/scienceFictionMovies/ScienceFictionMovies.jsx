import MovieCards from "../movieCards/MovieCards";
import MainNavbar from "../navbar/MainNavbar";

function ScienceFictionMovies() {
    return (
        <>
            <MainNavbar />
            <MovieCards category="science_fiction" />
        </>
    );
}

export default ScienceFictionMovies;
