import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { fetchMovies, searchMovies } from "../../api/Api";

import Pagination from "../pagination/Pagination";
import MainSearcher from "../searcher/MainSearcher.jsx";
import { Spinner } from "react-bootstrap";
import { FiMaximize2 } from "react-icons/fi";
import { useContext } from "react";
import { AddToFavouriteContext } from "../../context/AddToFavouritesContext";
import {
    getDataFromLocalStorage,
    saveDataInLocalStorage,
} from "../../helpers/localStorageFunctions";
import DetailsModal from "../modals/DetailsModal";

import "./MovieCards.scss";
import FavouriteMovies from "../favouriteMovies/FavouriteMovies";
import FavouriteMoviesAddHeart from "../favouriteMovies/FavouriteMoviesAddHeart";

function MovieCards({ category }) {
    const { isFavourite, setIsFavourite } = useContext(AddToFavouriteContext);
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDetails, setShowDetails] = useState(null);
    useEffect(() => {
        let endpoint;
        if (category === "popular") {
            endpoint = `sort_by=popularity.desc&page=${currentPage}`;
        } else if (category === "kids") {
            endpoint = `certification_country=US&certification.lte=G&sort_by=popularity.desc&page=${currentPage}`;
        } else if (category === "science_fiction") {
            endpoint = `with_genres=878&sort_by=vote_average.desc&page=${currentPage}`;
        }

        setLoading(true);
        fetchMovies("GET", null, {}, endpoint)
            .then((data) => {
                setMovies(data.results);
                setTotalPages(data.total_pages);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [currentPage, category]);

    useEffect(() => {
        saveDataInLocalStorage("favourite_movies", isFavourite);
    }, [isFavourite]);

    useEffect(() => {
        const favouritesMovies = getDataFromLocalStorage("favourite_movies");
        setIsFavourite(favouritesMovies || []);
    }, []);

    useEffect(() => {
        if (searchTerm) {
            setLoading(true);
            searchMovies("GET", null, {}, `query=${searchTerm}`)
                .then((data) => {
                    setMovies(data.results);
                    setTotalPages(data.total_pages);
                })
                .catch((err) => console.log(err))
                .finally(() => setLoading(false));
        }
    }, [searchTerm]);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const addToFavourite = (movie) => {
        if (isFavourite.some((favMovie) => favMovie.title === movie.title)) {
            setIsFavourite((prevFavourites) =>
                prevFavourites.filter((item) => item.title !== movie.title)
            );
        } else {
            setIsFavourite((prevFavourites) => [...prevFavourites, movie]);
        }
    };

    const deleteFromFavourites = (movieId) => {
        setIsFavourite((prevFavourites) =>
            prevFavourites.filter((movie) => movie.id !== movieId)
        );
    };

    const handleShowDetails = (movieID) => {
        // Toggle the modal for the clicked movieID
        setShowDetails((prevValue) => (prevValue === movieID ? null : movieID));
    };

    const tmdbImageUrl = "https://image.tmdb.org/t/p";
    const imageSize = "w500";

    return (
        <>
            <MainSearcher searchTerm={searchTerm} handleSearch={handleSearch} />
            <FavouriteMovies
                favouriteMovies={isFavourite}
                deleteFromFavourites={deleteFromFavourites}
            />
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    <Pagination
                        currentPage={currentPage}
                        handlePageClick={handlePageClick}
                        totalPages={totalPages}
                    />
                    <div className="movie-card-container">
                        {movies?.map((movie) => (
                            <>
                                <Card
                                    key={`movie-${movie.title}-${movie.id}`}
                                    className="movie-card"
                                >
                                    <div className="image-container">
                                        {/* Icon for maximizing */}
                                        <div
                                            className="maximize-icon"
                                            onClick={() => {
                                                handleShowDetails(movie.id);
                                            }}
                                        >
                                            <FiMaximize2 size={12} />
                                        </div>

                                        {/* Movie poster */}
                                        <Card.Img
                                            variant="top"
                                            src={`${tmdbImageUrl}/${imageSize}${movie.poster_path}`}
                                        />
                                    </div>
                                    <Card.Body>
                                        <Card.Title
                                            style={{ fontSize: "1rem" }}
                                        >
                                            {movie.title}
                                        </Card.Title>
                                        <Card.Text
                                            style={{ fontSize: "0.75rem" }}
                                        >
                                            {`${movie.overview?.slice(
                                                0,
                                                75
                                            )}...`}
                                        </Card.Text>
                                        <FavouriteMoviesAddHeart
                                            isFavourite={isFavourite}
                                            addToFavourite={addToFavourite}
                                            movie={movie}
                                        />
                                    </Card.Body>
                                </Card>
                                <DetailsModal
                                    movie={movie}
                                    show={showDetails === movie.id}
                                    onHide={() => setShowDetails(null)}
                                    isFavourite={isFavourite}
                                    addToFavourite={addToFavourite}
                                />
                            </>
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        handlePageClick={handlePageClick}
                        totalPages={totalPages}
                    />
                </>
            )}
        </>
    );
}

export default MovieCards;
