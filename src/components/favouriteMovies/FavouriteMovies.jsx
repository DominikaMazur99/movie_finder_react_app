import { useEffect, useState } from "react";
import { useContext } from "react";
import Card from "react-bootstrap/Card";

import { AddToFavouriteContext } from "../../context/AddToFavouritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getDataFromLocalStorage } from "../../helpers/localStorageFunctions";

function FavouriteMovies() {
    const { isFavourite, setIsFavourite } = useContext(AddToFavouriteContext);

    const tmdbImageUrl = "https://image.tmdb.org/t/p";
    const imageSize = "w500";

    useEffect(() => {
        const favouritesMovies = getDataFromLocalStorage("favourite_movies");
        setIsFavourite(favouritesMovies || []);
    }, []);

    const addToFavourite = (movie) => {
        if (isFavourite.some((favMovie) => favMovie.title === movie.title)) {
            setIsFavourite((prevFavourites) =>
                prevFavourites.filter((item) => item.title !== movie.title)
            );
        } else {
            setIsFavourite((prevFavourites) => [...prevFavourites, movie]);
        }
    };
    return (
        <>
            <div className="movie-card-container">
                {isFavourite?.map((movie) => (
                    <Card key={`movie-${movie.title}`} className="movie-card">
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
                                            favMovie.title === movie.title
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
        </>
    );
}

export default FavouriteMovies;
