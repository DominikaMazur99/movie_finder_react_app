import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { fetchMovies } from "../../api/Api";

import "./MovieCards.scss";
import Pagination from "../pagination/Pagination";

function MovieCards() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchMovies(
            "GET",
            null,
            {},
            `sort_by=popularity.desc&page=${currentPage}`
        )
            .then((data) => {
                setPopularMovies(data.results);
                setTotalPages(data.total_pages);
            })
            .catch((err) => console.log(err));
    }, [currentPage]);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const tmdbImageUrl = "https://image.tmdb.org/t/p";
    const imageSize = "w500";

    return (
        <div className="movie-card-container">
            {popularMovies?.map(({ poster_path, title, overview }) => (
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
    );
}

export default MovieCards;
