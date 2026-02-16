export function saveFavorite(country) {
    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!fav.includes(country)) fav.push(country);
    localStorage.setItem("favorites", JSON.stringify(fav));
}

export function getFavorites() { return JSON.parse(localStorage.getItem("favorites")) || []; }

export function saveSearchHistory(country) {
    const hist = JSON.parse(localStorage.getItem("history")) || [];
    if (!hist.includes(country)) hist.push(country);
    localStorage.setItem("history", JSON.stringify(hist));
}

export function getSearchHistory() { return JSON.parse(localStorage.getItem("history")) || []; }
