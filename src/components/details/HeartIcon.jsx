import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useContext } from "react";
import { AddToFavouriteContext } from "../../context/AddToFavouritesContext";
import "./HeartIcon.scss";

const HeartIcon = () => {
    const { isFavourite, setIsFavourite } = useContext(AddToFavouriteContext);

    return (
        <div
            className="heart-icon"
            onClick={() => setIsFavourite(!isFavourite)}
        >
            {isFavourite ? <FaHeart /> : <FaRegHeart />}
        </div>
    );
};

export default HeartIcon;
