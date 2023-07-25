import { useState } from "react";
import { Container } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

import { MdDeleteForever } from "react-icons/md";

import "./FavouriteMovies.scss";

function FavouriteMovies({ favouriteMovies, deleteFromFavourites }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDeleteFromFavourites = (movieId) => {
        deleteFromFavourites(movieId);
    };

    return (
        <Container className="mt-3">
            <Dropdown
                show={isDropdownOpen}
                onToggle={(isOpen) => setIsDropdownOpen(isOpen)}
            >
                <Dropdown.Toggle
                    variant="secondary"
                    id="dropdown-favourites-toggle"
                >
                    Favourite Movies List
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: "80.5%" }}>
                    {favouriteMovies.length === 0 ? (
                        <Dropdown.Item disabled>
                            <div className="favourite-movie">no favourites</div>
                        </Dropdown.Item>
                    ) : (
                        favouriteMovies.map(({ id, title }) => (
                            <Dropdown.Item eventKey={id} key={id}>
                                <div className="favourite-movie">
                                    <div>{title}</div>
                                    <div
                                        className="delete-icon"
                                        onClick={() => {
                                            handleDeleteFromFavourites(id);
                                        }}
                                    >
                                        <MdDeleteForever size={18} />
                                    </div>
                                </div>
                            </Dropdown.Item>
                        ))
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </Container>
    );
}

export default FavouriteMovies;
