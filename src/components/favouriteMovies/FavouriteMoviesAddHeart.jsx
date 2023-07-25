import { FaHeart, FaRegHeart } from "react-icons/fa";

function FavouriteMoviesAddHeart({ isFavourite, addToFavourite, movie }) {
    return (
        <>
            <div className="favourite-add">
                <div
                    className="heart-icon"
                    onClick={() => {
                        addToFavourite(movie);
                    }}
                >
                    {isFavourite.some(
                        (favMovie) => favMovie.title === movie.title
                    ) ? (
                        <FaHeart />
                    ) : (
                        <FaRegHeart />
                    )}
                </div>
            </div>
        </>
    );
}

export default FavouriteMoviesAddHeart;
