import { getCountry, getWikiSummary, getTopAttractions } from "./api.js";
import { renderCountryCard, renderCountryDetails } from "./ui.js";
import { saveFavorite, saveSearchHistory } from "./storage.js";

const params = new URLSearchParams(window.location.search);
const countryName = params.get("name");

const darkModeBtn = document.getElementById("darkModeBtn");
if (darkModeBtn) darkModeBtn.addEventListener("click", () => document.body.classList.toggle("dark"));

if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
    document.getElementById("searchBtn").addEventListener("click", async () => {
        const input = document.getElementById("searchInput").value;
        if (!input) return alert("Enter a country name");
        try {
            const country = await getCountry(input);
            renderCountryCard(country);
            saveSearchHistory(country.name.common);
        } catch (err) {
            document.getElementById("mainContent").innerHTML = `<p>Error: ${err.message}</p>`;
        }
    });
}

if (window.location.pathname.endsWith("country.html") && countryName) {
    (async () => {
        try {
            const country = await getCountry(countryName);
            const wiki = await getWikiSummary(country.name.common);
            const attractions = await getTopAttractions(country.name.common);
            renderCountryDetails(country, wiki, attractions);

            document.getElementById("favoriteBtn").addEventListener("click", () => {
                saveFavorite(country.name.common);
                alert(`${country.name.common} added to favorites!`);
            });

            saveSearchHistory(country.name.common);
        } catch (err) {
            document.getElementById("countryContent").innerHTML = `<p>Error: ${err.message}</p>`;
        }
    })();
}
