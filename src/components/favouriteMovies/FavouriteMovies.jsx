import { Container } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

import { MdDeleteForever } from "react-icons/md";

import "./FavouriteMovies.scss";

function FavouriteMovies({ favouriteMovies, setIsFavourite }) {
    // const deleteFromFavourites = (movieId) => {
    //     const newState = favouriteMovies.filter(({ id }) => id === movieId);
    //     setIsFavourite(newState);
    // };
    return (
        <Container className="mt-3">
            <Dropdown.Menu show style={{ width: "80.5%" }}>
                <Dropdown.Header>Favourite Movies List</Dropdown.Header>
                {favouriteMovies.map(({ id, title }) => (
                    <Dropdown.Item eventKey={id}>
                        <div className="favourite-movie">
                            <div>{title}</div>
                            <div
                                className="delete-icon"
                                onClick={deleteFromFavourites(id)}
                            >
                                <MdDeleteForever size={18} />
                            </div>
                        </div>
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Container>
    );
}

export default FavouriteMovies;
