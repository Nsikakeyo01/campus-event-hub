const events = [
    { id: 1, name: "Music Fest", date: "April 20", location: "Hall A" },
    { id: 2, name: "Tech Talk", date: "April 22", location: "Room B" },
    { id: 3, name: "Sports Day", date: "April 25", location: "Field" }
];

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// DISPLAY EVENTS
function displayEvents(list) {
    const container = document.getElementById("events");
    container.innerHTML = "";

    list.forEach(event => {
        const div = document.createElement("div");
        div.className = "event";

        div.innerHTML = `
            <h3 onclick="openModal(${event.id})">${event.name}</h3>
            <p>${event.date}</p>
            <p>${event.location}</p>
            <button onclick="addFavorite(${event.id})">⭐ Save</button>
        `;

        container.appendChild(div);
    });
}

// FAVORITES
function addFavorite(id) {
    const event = events.find(e => e.id === id);

    if (!favorites.some(f => f.id === id)) {
        favorites.push(event);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        displayFavorites();
    }
}

function removeFavorite(id) {
    favorites = favorites.filter(f => f.id !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFavorites();
}

function displayFavorites() {
    const container = document.getElementById("favorites");
    container.innerHTML = "";

    favorites.forEach(event => {
        const div = document.createElement("div");
        div.className = "event";

        div.innerHTML = `
            <h3>${event.name}</h3>
            <button onclick="removeFavorite(${event.id})">Remove</button>
        `;

        container.appendChild(div);
    });
}

// SEARCH
document.getElementById("search").addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    const filtered = events.filter(ev =>
        ev.name.toLowerCase().includes(value)
    );
    displayEvents(filtered);
});

// MODAL
function openModal(id) {
    const event = events.find(e => e.id === id);

    document.getElementById("modal-body").innerHTML = `
        <h2>${event.name}</h2>
        <p>Date: ${event.date}</p>
        <p>Location: ${event.location}</p>
    `;

    document.getElementById("modal").style.display = "block";
}

document.getElementById("close").onclick = function () {
    document.getElementById("modal").style.display = "none";
};

// WEATHER API
async function getWeather() {
    const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=6.5244&longitude=3.3792&current_weather=true");
    const data = await res.json();

    document.getElementById("weather").innerText =
        "🌤 Lagos Weather: " + data.current_weather.temperature + "°C";
}

// INIT
displayEvents(events);
displayFavorites();
getWeather();