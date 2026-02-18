(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}})();async function m(t){try{const e=await fetch(`https://restcountries.com/v3.1/name/${t}`);if(!e.ok)throw new Error("Country not found");return(await e.json())[0]}catch(e){throw console.error(e),e}}async function u(t){try{const e=await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${t}`);if(!e.ok)throw new Error("Wikipedia summary not found");return(await e.json()).extract}catch(e){return console.error(e),"No summary available."}}async function g(t){try{const e=`Tourist attractions in ${t}`,a=await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(e)}`);if(!a.ok)return{text:"No attractions found.",images:[]};const r=await a.json(),n=r.thumbnail?[r.thumbnail.source]:[];return{text:r.extract,images:n}}catch(e){return console.error(e),{text:"No attractions found.",images:[]}}}function p(t){const e=document.getElementById("mainContent");e.innerHTML=`
    <div class="country-card">
      <img src="${t.flags.png}" alt="Flag of ${t.name.common}">
      <h2>${t.name.common}</h2>
      <p><strong>Capital:</strong> ${t.capital||"N/A"}</p>
      <p><strong>Population:</strong> ${t.population.toLocaleString()}</p>
      <button class="detailsBtn">View Details</button>
    </div>
  `,document.querySelector(".detailsBtn").addEventListener("click",()=>{window.location.href=`country.html?name=${encodeURIComponent(t.name.common)}`})}function f(t,e,a={text:"",images:[]}){const r=document.getElementById("countryContent"),n=Object.values(t.languages||{}).join(", "),o=Object.values(t.currencies||{USD:{name:"USD"}})[0].name;let i=`<h3>Top Attractions</h3><p>${a.text}</p>`;a.images.length>0&&(i+='<div class="attractions">',a.images.forEach(d=>i+=`<img src="${d}" alt="Attraction in ${t.name.common}" class="attraction-img">`),i+="</div>"),r.innerHTML=`
    <div class="country-card">
      <img src="${t.flags.png}" alt="Flag of ${t.name.common}">
      <h2>${t.name.common}</h2>
      <p><strong>Capital:</strong> ${t.capital||"N/A"}</p>
      <p><strong>Population:</strong> ${t.population.toLocaleString()}</p>
      <p><strong>Currency:</strong> ${o}</p>
      <p><strong>Languages:</strong> ${n}</p>
      <h3>About the Country</h3>
      <p>${e}</p>
      ${i}
      <button id="favoriteBtn">⭐ Add to Favorites</button>
    </div>
  `}function h(t){const e=JSON.parse(localStorage.getItem("favorites"))||[];e.includes(t)||e.push(t),localStorage.setItem("favorites",JSON.stringify(e))}function l(t){const e=JSON.parse(localStorage.getItem("history"))||[];e.includes(t)||e.push(t),localStorage.setItem("history",JSON.stringify(e))}const y=new URLSearchParams(window.location.search),s=y.get("name"),c=document.getElementById("darkModeBtn");c&&c.addEventListener("click",()=>document.body.classList.toggle("dark"));(window.location.pathname.endsWith("index.html")||window.location.pathname==="/")&&document.getElementById("searchBtn").addEventListener("click",async()=>{const t=document.getElementById("searchInput").value;if(!t)return alert("Enter a country name");try{const e=await m(t);p(e),l(e.name.common)}catch(e){document.getElementById("mainContent").innerHTML=`<p>Error: ${e.message}</p>`}});window.location.pathname.endsWith("country.html")&&s&&(async()=>{try{const t=await m(s),e=await u(t.name.common),a=await g(t.name.common);f(t,e,a),document.getElementById("favoriteBtn").addEventListener("click",()=>{h(t.name.common),alert(`${t.name.common} added to favorites!`)}),l(t.name.common)}catch(t){document.getElementById("countryContent").innerHTML=`<p>Error: ${t.message}</p>`}})();
