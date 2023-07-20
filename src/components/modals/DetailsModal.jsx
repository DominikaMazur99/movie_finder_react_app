import { Button, Modal } from "react-bootstrap";
import "./DetailsModal.scss";

function DetailsModal({ show, onHide, movie }) {
    const tmdbImageUrl = "https://image.tmdb.org/t/p";
    const imageSize = "w200";
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {movie.title}
                </Modal.Title>
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
