import { createContext } from "react";
import { useState } from "react";

export const AddToFavouriteContext = createContext();

const AddToFavouriteProvider = ({ children }) => {
    const [isFavourite, setIsFavourite] = useState(false);

    const values = {
        isFavourite,
        setIsFavourite,
    };
    return (
        <AddToFavouriteContext.Provider value={values}>
            {children}
        </AddToFavouriteContext.Provider>
    );
};

export default AddToFavouriteProvider;
