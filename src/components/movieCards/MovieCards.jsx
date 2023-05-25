import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { fetchMovies, searchMovies } from "../../api/Api";

import "./MovieCards.scss";
import Pagination from "../pagination/Pagination";
import MainSearcher from "../searcher/MainSearcher.jsx";
import { Spinner } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useContext } from "react";
import { AddToFavouriteContext } from "../../context/AddToFavouritesContext";
import { saveDataInLocalStorage } from "../../helpers/localStorageFunctions";

function MovieCards({ category }) {
    const { isFavourite, setIsFavourite } = useContext(AddToFavouriteContext);
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

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

    const tmdbImageUrl = "https://image.tmdb.org/t/p";
    const imageSize = "w500";
    console.log(isFavourite);
    return (
        <>
            <MainSearcher searchTerm={searchTerm} handleSearch={handleSearch} />
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    <div className="movie-card-container">
                        {movies?.map((movie) => (
                            <Card
                                key={`movie-${movie.title}`}
                                className="movie-card"
                            >
                                <Card.Img
                                    variant="top"
                                    src={`${tmdbImageUrl}/${imageSize}${movie.poster_path}`}
                                />
                                <Card.Body>
                                    <Card.Title style={{ fontSize: "1rem" }}>
                                        {movie.title}
                                    </Card.Title>
                                    <Card.Text style={{ fontSize: "0.75rem" }}>
                                        {`${movie.overview?.slice(0, 75)}...`}
                                    </Card.Text>
                                    <div className="favourite-add">
                                        <div
                                            className="heart-icon"
                                            onClick={() => {
                                                addToFavourite(movie);
                                            }}
                                        >
                                            {isFavourite.some(
                                                (favMovie) =>
                                                    favMovie.title ===
                                                    movie.title
                                            ) ? (
                                                <FaHeart />
                                            ) : (
                                                <FaRegHeart />
                                            )}
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
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
