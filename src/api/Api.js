// export async function fetchMovies(params) {
//     const apiKey = "280e8d5f4d972c7dd3aa5c4171bebf68";
//     const url = `https://api.themoviedb.org/3/discover/movie/?${params}&api_key=${apiKey}`;

//     fetch(url)
//         .then((response) => response.json())
//         .then((data) => {
//             // data contains the list of popular movies
//             console.log(data);
//         })
//         .catch((error) => {
//             console.error("Error fetching data:", error);
//         });
// }

export const fetchMovies = async (
    method = "GET",
    body = null,
    headers = {},
    params
) => {
    try {
        const apiKey = "280e8d5f4d972c7dd3aa5c4171bebf68";
        const url = `https://api.themoviedb.org/3/discover/movie/?${params}&api_key=${apiKey}`;
        const response = await fetch(url, {
            method,
            body,
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
};
