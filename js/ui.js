export function renderCountryCard(country) {
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    <div class="country-card">
      <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
      <h2>${country.name.common}</h2>
      <p><strong>Capital:</strong> ${country.capital || "N/A"}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <button class="detailsBtn">View Details</button>
    </div>
  `;
  document.querySelector(".detailsBtn").addEventListener("click", () => {
    window.location.href = `country.html?name=${encodeURIComponent(country.name.common)}`;
  });
}

export function renderCountryDetails(country, wikiText, attractions = { text: "", images: [] }) {
  const main = document.getElementById("countryContent");
  const languages = Object.values(country.languages || {}).join(", ");
  const currency = Object.values(country.currencies || { USD: { name: "USD" } })[0].name;

  let attractionsHTML = `<h3>Top Attractions</h3><p>${attractions.text}</p>`;
  if (attractions.images.length > 0) {
    attractionsHTML += `<div class="attractions">`;
    attractions.images.forEach(url => attractionsHTML += `<img src="${url}" alt="Attraction in ${country.name.common}" class="attraction-img">`);
    attractionsHTML += `</div>`;
  }

  main.innerHTML = `
    <div class="country-card">
      <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
      <h2>${country.name.common}</h2>
      <p><strong>Capital:</strong> ${country.capital || "N/A"}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Currency:</strong> ${currency}</p>
      <p><strong>Languages:</strong> ${languages}</p>
      <h3>About the Country</h3>
      <p>${wikiText}</p>
      ${attractionsHTML}
      <button id="favoriteBtn">⭐ Add to Favorites</button>
    </div>
  `;
}
