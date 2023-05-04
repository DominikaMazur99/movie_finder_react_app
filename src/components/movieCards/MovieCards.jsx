import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { fetchMovies, searchMovies } from "../../api/Api";

import "./MovieCards.scss";
import Pagination from "../pagination/Pagination";
import { Spinner } from "react-bootstrap";

function MovieCards({ category }) {
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

    const tmdbImageUrl = "https://image.tmdb.org/t/p";
    const imageSize = "w500";

    return (
        <>
            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div className="movie-card-container">
                    {movies?.map(({ poster_path, title, overview }) => (
                        <Card key={`movie-${title}`} className="movie-card">
                            <Card.Img
                                variant="top"
                                src={`${tmdbImageUrl}/${imageSize}${poster_path}`}
                            />
                            <Card.Body>
                                <Card.Title style={{ fontSize: "1rem" }}>
                                    {title}
                                </Card.Title>
                                <Card.Text style={{ fontSize: "0.75rem" }}>
                                    {`${overview?.slice(0, 75)}...`}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                    <Pagination
                        currentPage={currentPage}
                        handlePageClick={handlePageClick}
                        totalPages={totalPages}
                    />
                </div>
            )}
        </>
    );
}

export default MovieCards;
