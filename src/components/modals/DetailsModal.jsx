import { Button, Modal } from "react-bootstrap";

import FavouriteMoviesAddHeart from "../favouriteMovies/FavouriteMoviesAddHeart";

import "./DetailsModal.scss";

function DetailsModal({ show, onHide, movie, isFavourite, addToFavourite }) {
    const tmdbImageUrl = "https://image.tmdb.org/t/p";
    const imageSize = "w200";
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {movie.title}
                </Modal.Title>
                <div style={{ marginLeft: "10px" }}>
                    <FavouriteMoviesAddHeart
                        isFavourite={isFavourite}
                        addToFavourite={addToFavourite}
                        movie={movie}
                    />
                </div>
            </Modal.Header>
            <Modal.Body>
                <h4>
                    <img
                        className="movie-img"
                        src={`${tmdbImageUrl}/${imageSize}${movie.poster_path}`}
                    />
                </h4>
                <p>{movie.overview}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DetailsModal;
