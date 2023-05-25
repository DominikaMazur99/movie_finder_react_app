// Function to save data to localStorage
export function saveDataInLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Function to delete data from localStorage
export function deleteDataFromLocalStorage(key) {
    localStorage.removeItem(key);
}

// Function to get data from localStorage
export function getDataFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}
