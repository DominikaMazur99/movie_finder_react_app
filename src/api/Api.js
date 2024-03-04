export const fetchMovies = async (params) => {
    try {
        const apiKey = "280e8d5f4d972c7dd3aa5c4171bebf68";
        const url = `https://api.themoviedb.org/3/discover/movie?${params}&api_key=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
};

export const searchMovies = async (params) => {
    try {
        const apiKey = "280e8d5f4d972c7dd3aa5c4171bebf68";
        const url = `https://api.themoviedb.org/3/search/movie?${params}&api_key=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
};
