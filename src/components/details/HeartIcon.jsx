import { FaHeart, FaRegHeart } from "react-icons/fa";

import "./HeartIcon.scss";

const HeartIcon = ({ addToFavourite, isFavourite }) => {
    return (
        <div className="heart-icon" onClick={addToFavourite}>
            {isFavourite ? <FaHeart /> : <FaRegHeart />}
        </div>
    );
};

export default HeartIcon;
