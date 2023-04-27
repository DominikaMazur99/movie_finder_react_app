import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { fetchMovies } from "../../api/Api";

import "./MovieCards.scss";

function MovieCards() {
    const [popularMovies, setPopularMovies] = useState([]);
    useEffect(() => {
        fetchMovies("?sort_by=popularity.desc")
            .then((data) => setPopularMovies(data))
            .catch((err) => console.log(err));
    }, []);

    const tmdbImageUrl = "https://image.tmdb.org/t/p";
    const imageSize = "w500";
    console.log(popularMovies?.results);
    return (
        <div className="movie-card-container">
            {popularMovies?.results?.map(({ poster_path, title, overview }) => (
                <Card key={`movie-${title}`} className="movie-card">
                    <Card.Img
                        variant="top"
                        src={`${tmdbImageUrl}/${imageSize}${poster_path}`}
                    />
                    <Card.Body>
                        <Card.Title style={{ fontSize: "1rem" }}>
                            {title}
                        </Card.Title>
                        <Card.Text
                            style={{ fontSize: "0.75rem" }}
                        >{`${overview?.slice(0, 75)}...`}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default MovieCards;
