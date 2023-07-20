import MovieCards from "../movieCards/MovieCards";
import MainNavbar from "../navbar/MainNavbar";

function KidsMovies() {
    return (
        <>
            <MainNavbar />
            <MovieCards category="kids" />
        </>
    );
}
export default KidsMovies;
