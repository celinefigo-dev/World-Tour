// api.js
export async function getCountry(name) {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        if (!res.ok) throw new Error("Country not found");
        const data = await res.json();
        return data[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function getWikiSummary(countryName) {
    try {
        const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${countryName}`);
        if (!res.ok) throw new Error("Wikipedia summary not found");
        const data = await res.json();
        return data.extract;
    } catch (err) {
        console.error(err);
        return "No summary available.";
    }
}

export async function getTopAttractions(countryName) {
    try {
        const page = `Tourist attractions in ${countryName}`;
        const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(page)}`);
        if (!res.ok) return { text: "No attractions found.", images: [] };
        const data = await res.json();
        const images = data.thumbnail ? [data.thumbnail.source] : [];
        return { text: data.extract, images };
    } catch (err) {
        console.error(err);
        return { text: "No attractions found.", images: [] };
    }
}
