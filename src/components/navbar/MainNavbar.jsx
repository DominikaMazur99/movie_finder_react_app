import { Container, Dropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { BiMoviePlay } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import React, { useContext, useState } from "react";
import { AddToFavouriteContext } from "../../context/AddToFavouritesContext";

import "./MainNavbar.scss";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </div>
));

function MainNavbar() {
  const { isFavourite } = useContext(AddToFavouriteContext);

  const [showFavouriteMovies, setShowFavouriteMovies] = useState(false);

  const handleShowFavourites = () => {
    setShowFavouriteMovies(!showFavouriteMovies);
  };

  const handleCloseList = () => {
    setShowFavouriteMovies(false);
  };
  return (
    <>
      <Navbar className="flex-column navbar-section ">
        <Container>
          <Navbar.Brand href="/" className="text-left ">
            <div className="d-flex align-items-center">
              <div>
                <BiMoviePlay size={30} />
              </div>
              <div className="ml-2">MovieFinder</div>
            </div>
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link>
              <FaHeart onClick={handleShowFavourites} />

              {showFavouriteMovies && (
                <Dropdown show={showFavouriteMovies} onToggle={handleCloseList}>
                  <Dropdown.Toggle
                    as={CustomToggle}
                    id="dropdown-heart-toggle"
                  ></Dropdown.Toggle>
                  <Dropdown.Menu>
                    {isFavourite.map(({ id, original_title }) => (
                      <Dropdown.Item key={id}>{original_title}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav.Link>
            <Nav.Link href="/">Popular</Nav.Link>
            <Nav.Link href="/kids">Kids</Nav.Link>
            <Nav.Link href="/science_fiction">Science Fiction</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default MainNavbar;
